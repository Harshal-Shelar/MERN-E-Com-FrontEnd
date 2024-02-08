import React from 'react'
import rightIcon from '../Assets/Images/right.png';
import updateIcon from '../Assets/Images/updateIcon.png';

const Popup = (props) => {
    return (
        <>
            <div className="overlay">
                <div className="popup">
                    <div className="content">
                        {
                            props.img === "added" &&
                            <img className='rightIcon' src={rightIcon} alt="" />
                        }
                        {
                            props.img === "updated" &&
                            <img className='rightIcon' src={updateIcon} alt="" />
                        }
                        {
                            props.img === "deleted" &&
                            <img className='rightIcon' src={rightIcon} alt="" />
                        }
                        <p className='popupHeading'>{props.title}</p>
                    </div>
                </div >
            </div >
        </>
    )
}

export default Popup
