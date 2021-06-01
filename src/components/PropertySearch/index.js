import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import SearchList from '../SearchList'
import ListRow from '../ListRow'
import Page from '../Page'
import splitAddress from '../../util/splitAddress'

import { fireFetchDataForProperties } from '../../actions'



const renderRow = (result, index) => {
  const address = splitAddress(result.address)
  return (
    <ListRow key={index}
             id={index}
             iconName={'globe'}
             header={address[0]}
             description={address[1]}
             labelText={result.unit_type}
             onClick={() => {
               onRowClick(result)
             }}
    />

  )
}




const onRowClick = (selectedRow) => {
  selectedRow.selected = !selectedRow.selected
}


const PropertySearch = () => {

  const dispatch = useDispatch();

  const [searchResults, setSearchResults] = useState([])

  const getResults = async (query) => {
    const formattedQuery = query.replace(/ /g, '%25')
    const url = 'mob/locations/search?query=address=like=' + '%25' + formattedQuery + '%25'


    const jwt = localStorage.getItem('JWT')

    const requestOptions = {
      headers: {
        ...(jwt && { 'x-access-token': jwt })
      }
    }

    // TODO handle no response from backend (try with vpn off)
    // TODO test jwt expiration
    return fetch(url, requestOptions)
      .then(response => {
        return response.text()
      })
      .then(data => {

        const parsedResults = JSON.parse(data)
        setSearchResults(parsedResults)

        return parsedResults || []

      })
      .catch(error => console.error(error))
  }

  const fetchDataForProperties = () => {

    const selectedProperties = searchResults.filter(result => result.selected)
    const selectedLocodes = selectedProperties.map(property => property.lo_code)

    dispatch(fireFetchDataForProperties(selectedLocodes));

  }

  const content = <div>
    <button onClick={fetchDataForProperties}>download selected</button>
    <SearchList renderRow={renderRow}
                getResults={getResults}
                onRowClick={onRowClick}
                inputPlaceHolder={'Search for a property...'}/></div>

  return (
    <Page classNames={['property-search']} title={'Property Search'} content={content}/>
  )
}

export default PropertySearch



