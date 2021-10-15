export const PurchaseSection = () => {
    return (
      <div className="container">
        <div className="col-md-8 offset-md-2 bg-secondary d-grid">
          <div className="row">
            <div className="col-md-10 offset-md-1">
              <div className="card my-2">
                <div className="row">
                  <div className="col-md-4">
                    <img src="https://http2.mlstatic.com/D_Q_NP_897670-MLA47135994890_082021-AB.webp" className="img-fluid rounded-start" alt="product" />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h4 className="card-title">Product Title</h4>
                      <p className="card-text">Product Description</p>
                      <h5>Precio: $5.000</h5>
                      <select class="form-select form-select-sm" style={{width: '100px'}} aria-label=".form-select-sm example">
                        <option selected>Quantity</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                      </select>
                      <button className="btn btn-primary mt-2">BOTON DE MERCADO PAGO</button>
                      <button className="btn btn-warning mt-2 ms-2">Remove from cart</button>
                    </div>
                  </div>
                </div>
              </div>
              {/* ----------------------------------------------------------------------------- */}
              <div className="card my-2">
                <div className="row">
                  <div className="col-md-4">
                    <img src="https://http2.mlstatic.com/D_Q_NP_897670-MLA47135994890_082021-AB.webp" className="img-fluid rounded-start" alt="product" />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h4 className="card-title">Product Title</h4>
                      <p className="card-text">Product Description</p>
                      <h5>Precio: $5.000</h5>
                      <select class="form-select form-select-sm" style={{width: '100px'}} aria-label=".form-select-sm example">
                        <option selected>Quantity</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                      </select>
                      <button className="btn btn-primary mt-2">BOTON DE MERCADO PAGO</button>
                      <button className="btn btn-warning mt-2 ms-2">Remove from cart</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card my-2">
                <div className="row">
                  <div className="col-md-4">
                    <img src="https://http2.mlstatic.com/D_Q_NP_897670-MLA47135994890_082021-AB.webp" className="img-fluid rounded-start" alt="product" />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h4 className="card-title">Product Title</h4>
                      <p className="card-text">Product Description</p>
                      <h5>Precio: $5.000</h5>
                      <select class="form-select form-select-sm" style={{width: '100px'}} aria-label=".form-select-sm example">
                        <option selected>Quantity</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                      </select>
                      <button className="btn btn-primary mt-2">BOTON DE MERCADO PAGO</button>
                      <button className="btn btn-warning mt-2 ms-2">Remove from cart</button>
                    </div>
                  </div>
                </div>
              </div>
              
  
  
            </div>
            <div className="col-md-10 offset-md-1 d-grid mb-3">
            <button className="btn btn-primary">Buy All</button>
          </div>
          </div>
        </div>
      </div>
    )
  }