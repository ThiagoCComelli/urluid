import React,{useEffect} from 'react';
import {api} from '../database/firebase'

const Redirect = (props) => {

    useEffect(() => {
        const getUrl = async () => {
            try{
                if(props.match.params.id !== undefined){
                    const dataURL = await api.getLink(props.match.params.id)
                    if(dataURL.data()){
                        api.incrementClicks(props.match.params.id)
                    }
                    var document_ = document.getElementById("getLink")
                    document_.setAttribute('href',dataURL.data().url)
                    document_.click()
                }
            }catch{

            }
        }

        getUrl()
        
        // eslint-disable-next-line
    },[])

    return (
        <>
            <a id="getLink" href="/" style={{display: "none"}}>Link Redirect</a>
        </>
    )
}

export default Redirect;
