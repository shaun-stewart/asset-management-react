import React, { useState, useEffect, useRef } from 'react'
import { List } from "@orchard/react-components";





const SearchList = (props) => {

  const {renderRow, getResults, inputPlaceHolder = ''} = props;

  // SET INITIAL STATE FOR query AND results
  // CREATE REF FOR SEARCH INPUT
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const focusSearch = useRef(null)

  // useEffect - FOCUS ON SEARCH INPUT
  useEffect(() => {focusSearch.current.focus()}, [])

  // PREVENTS RERENDER FLICKERING AS USER TYPES IN SEARCH
  const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  // useEffect - ONLY RERENDERS WHEN query IS CHANGED
  useEffect(() => {
    let currentQuery = true
    const controller = new AbortController()

    const loadResults = async () => {
      // if (!query) return setResults([])

      await sleep(350)
      if (currentQuery) {
        const results = await getResults(query, controller)
        setResults(results)
      }
    }

    loadResults();

    return () => {
      currentQuery = false
      controller.abort()
    }
  }, [query])

  // RENDER RESULTS
  let resultsComponents = results.map((result, index) => {
    return renderRow(result, index);
  })

  // RENDER COMPONENT
  return (
    <div>
      <input
        placeholder={inputPlaceHolder}
        ref={focusSearch}
        onChange={(e) => setQuery(e.target.value)}
        value={query}>
      </input>

      <List>
        {resultsComponents}
      </List>
    </div>
  )


}


export default SearchList;