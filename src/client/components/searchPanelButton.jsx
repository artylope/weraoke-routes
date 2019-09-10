import React from 'react';
import PropTypes from 'prop-types';


class SearchPanelButton extends React.Component{

  render(){

    let searchPanelButtonClasses = "";

    if(this.props.searchPanel === true){
      searchPanelButtonClasses = "search-panel-button hide"
    } else if (this.props.searchPanel === false){
      searchPanelButtonClasses = "search-panel-button show"
    }

    return(
      <div className="search-panel-button-wrapper">
        <div className={searchPanelButtonClasses} onClick={()=>this.props.handleSearchPanelShowHide(this.props.searchPanel)}>
          <i className='bx bx-search-alt'></i>
        </div>
      </div>
    )
  }


}
export default SearchPanelButton
