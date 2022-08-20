window.onload = () => {
    const inputSearch = document.getElementById("search-input");
    const formSearch = document.getElementById("searchForm");

    inputSearch.addEventListener("keypress", function(event) {
        
        if (event.key === "Enter") {
        formSearch.submit();
      
    }

    })
}