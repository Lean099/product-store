export const PurchasesMade = ()=>{
    return(
      <div className="container">
          <h2 className="text-center">Purchases</h2>
          <div className="row row-cols-3">
                <div className="col-md-4 m-2">
                    <div className="card p-2">
                          {/* Puedo poner una tag a para la imagen en esta parte arriba del card-body */}
                        <img src="https://www.lenovo.com/medias/lenovo-laptop-ideapad-3-15-intel-hero.png?context=bWFzdGVyfHJvb3R8MzAzNDQ1fGltYWdlL3BuZ3xoNjYvaDY2LzEwNzU3MjQxNTAzNzc0LnBuZ3xjMzU3NWY4OGEyYjYzYTEwOGFlYzhiNWJhODEwYzA1MTlkNDYxODI3ZGQxM2IzYTRhYmY4M2YzY2NjYjhhOGJj" className="card-img-top" alt="Computer"/>
                        <div className="card-body">
                          <h5 className="card-title">Laptop</h5>
                          <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                          <h4>$40000</h4>
                        </div>
                    </div>
                </div>
          </div>
      </div>
    )
  }