import React,{useEffect} from 'react';
import {api} from '../database/firebase'

const Redirect = (props) => {

    useEffect(() => {
        console.log(0)
        const getUrl = async () => {
            console.log(props.match.params.id)
            console.log(window.location.href)

            try{
                if(props.match.params.id !== undefined){
                    const dataURL = await api.getLink(props.match.params.id)
                    var document_ = document.getElementById("getLink")
                    document_.setAttribute('href',dataURL.data().url)
                    document_.click()
                    console.log(dataURL.data())
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
