import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import FullWidth from '../atoms/FullWidth'
import styles from './ProjectNav.module.scss'

const ProjectLink = ({ node }) => (
  <Link className={styles.link} to={node.slug}>
    <Img
      className={styles.image}
      fluid={node.img.childImageSharp.fluid}
      alt={node.title}
    />
    <h1 className={styles.title}>{node.title}</h1>
  </Link>
)

class ProjectNav extends Component {
  constructor(props) {
    super(props)

    this.state = {
      scrolledToCurrent: false
    }

    this.scrollToCurrent = this.scrollToCurrent.bind(this)
  }

  componentDidMount() {
    this.scrollToCurrent()
    this.setState({ scrolledToCurrent: true })
  }

  componentDidUpdate() {
    this.scrollToCurrent()
  }

  componentWillUnmount() {
    this.setState({ scrolledToCurrent: false })
  }

  scrollToCurrent = () => {
    const current = this.currentItem
    const currentLeft = current.getBoundingClientRect().left
    const currentWidth = current.clientWidth
    const finalPosition = currentLeft - window.innerWidth / 2 + currentWidth / 2

    this.scrollContainer.scrollLeft = finalPosition
  }

  render() {
    const { slug } = this.props

    return (
      <StaticQuery
        query={graphql`
          query ProjectsNavQuery {
            allProjectsYaml {
              edges {
                node {
                  title
                  slug
                  img {
                    childImageSharp {
                      fluid(maxWidth: 500, quality: 85) {
                        ...GatsbyImageSharpFluid_noBase64
                      }
                    }
                  }
                }
              }
            }
          }
        `}
        render={data => {
          const projects = data.allProjectsYaml.edges

          return (
            <FullWidth>
              <nav
                className={styles.projectNav}
                ref={node => {
                  this.scrollContainer = node
                }}
              >
                {projects.map(({ node }) => {
                  const current = node.slug === slug

                  return (
                    <div
                      className={styles.item}
                      key={node.slug}
                      ref={node => {
                        if (current) this.currentItem = node
                      }}
                    >
                      <ProjectLink node={node} />
                    </div>
                  )
                })}
              </nav>
            </FullWidth>
          )
        }}
      />
    )
  }
}

ProjectLink.propTypes = {
  node: PropTypes.object
}

ProjectNav.propTypes = {
  slug: PropTypes.string
}

export default ProjectNav
