import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import posed from 'react-pose'
import { moveInBottom } from '../atoms/Transitions'
import { ReactComponent as Logo } from '../../images/logo.svg'
import styles from './LogoUnit.module.scss'

const query = graphql`
  query {
    dataYaml {
      title
      tagline
    }
  }
`

const Animation = posed.div(moveInBottom)

export default class LogoUnit extends PureComponent {
  static propTypes = {
    minimal: PropTypes.bool
  }

  render() {
    return (
      <StaticQuery
        query={query}
        render={data => {
          const { title, tagline } = data.dataYaml
          const { minimal } = this.props

          return (
            <Animation>
              <div className={minimal ? styles.minimal : styles.logounit}>
                <Logo className={styles.logounit__logo} />
                <h1 className={styles.logounit__title}>
                  {title.toLowerCase()}
                </h1>
                <p className={styles.logounit__description}>
                  {tagline.toLowerCase()}
                </p>
              </div>
            </Animation>
          )
        }}
      />
    )
  }
}
