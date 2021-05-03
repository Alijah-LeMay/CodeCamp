import React from 'react'
import { Link } from 'react-router-dom'

// Assets
import classes from './ArticleContainer.module.css'

import { titleCase, elipsesText } from '../functions'

const ArticleContainer = (props) => {
  const { title, imageLOC, description, link, imgMargin, contentMargin } = props
  let updatedTitle = titleCase(title)
  return (
    <div className={classes.article_container}>
      <div className={classes.image_clipper}>
        <img
          className={classes.preview_image}
          style={{ marginTop: imgMargin ? imgMargin : '-20%' }}
          src={imageLOC}
          alt={updatedTitle}
        />
      </div>
      <div
        className={classes.preview_content}
        style={{ marginTop: contentMargin ? contentMargin : 0 }}
      >
        <h3>{updatedTitle}</h3>
        <p>{elipsesText(description, 80)}</p>
        <Link to={link}>Read More</Link>
      </div>
    </div>
  )
}

export default ArticleContainer
