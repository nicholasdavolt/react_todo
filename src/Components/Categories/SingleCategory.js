import React from 'react'

export default function SingleCategory(props) {

    const {catName, catDesc} = props.category
  return (
    <tr>
        <td>{catName}</td>
        <td>{catDesc}</td>
    </tr>
  )
}
