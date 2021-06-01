import React, {useEffect} from 'react';
import Page  from "../Page";
import SearchList from '../SearchList'
import ListRow from '../ListRow'
import splitAddress from '../../util/splitAddress'
import Fuse from 'fuse.js'
import Expander from '../Expander'
import { useDispatch, useSelector } from 'react-redux'
import { loadJobs, routeMasterSurveys, updateCurrentLoCode } from '../../actions'




const JobList = () => {
  const dispatch = useDispatch();

  useEffect(() => {dispatch(loadJobs())}, [])



  const renderRow = (result, index) => {
    const address = splitAddress(result.address);
    return (
      <Expander key={index}
                title={address[0]}
                content={<div><ListRow
                  id={index}
                  iconName={'globe'}
                  header={address[0]}
                  description={address[1]}
                  labelText={result.unit_type}/></div>}>
        <div> <button onClick={()=>{goToMasterSurveys(result.lo_code)}}>start survey</button> </div>
      </Expander>


    )
  }

  const goToMasterSurveys = loCode => {
    dispatch( updateCurrentLoCode(loCode) );
    dispatch( routeMasterSurveys() );
  }

  const jobs = useSelector(state => state.jobs.jobs);

  const getResults = (query) =>{

    if(query === ''){
      console.log('no query')
      return jobs;
    }
    console.log('no query')
    var options = {
      shouldSort: true,
      threshold: 0.5,
      location: 0,
      distance: 10,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: [
        "address"
      ]
    };
    var fuse = new Fuse(jobs, options);
    return fuse.search(query);

  }


  const content = <SearchList renderRow={renderRow}
                              getResults={getResults}
                              inputPlaceHolder={"Filter job list..."}/>

  return (
    <Page classNames={['job-list']} title={'Job List'} content={content}/>
  )
};

export default JobList;

