const Get = async (url) => {
    try{
        const response = await fetch(url);
        const res = await response.json();
        return res;

    }catch(error){
        console.error(error)
    }
} 

export default Get