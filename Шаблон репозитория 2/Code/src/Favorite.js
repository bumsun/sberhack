import React from 'react';
import img_favorites from './icons/img_favorites.svg'
class Favorite extends React.Component {
    constructor(props){
        super(props)
      
    }
  
    render() {
        return (
            <div className="test_container">
                <div className="center_container center_bookmark">
                    <img src={img_favorites}/>
                </div>
            </div>
        );
    }
}
export default Favorite;