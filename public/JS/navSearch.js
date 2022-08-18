window.onload = () => {
    const inputSearch = document.getElementById("search-input");
    const formSearch = document.getElementById("searchForm");


    const formatter = new Intl.NumberFormat("es-AR", { 
        style: "decimal",
        minimumFractionDigits: 2,
    });

    inputSearch.addEventListener("keypress", function(event) {
        
        if (event.key === "Enter") {
        formSearch.submit();
      
    }

    })
}