export const UpdateUser = ()=>{
    return(
        <div className="container">
          <h2 className="text-center">Update your data</h2>
          <form className="d-grid">
            <div className="row">
              <div className="col">
                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label">First Name</label>
                  <input type="text" className="form-control" id="fisrtName" />
                </div>
              </div>
              <div className="col">
                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label">Last Name</label>
                  <input type="text" className="form-control" id="lastName" />
                </div>
              </div>
            </div>
            {/* -------------------------------------------------- */}
            <div className="row">
              <div className="col">
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" className="form-control" id="email" />
                </div>
              </div>
              <div className="col">
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                  <input type="password" className="form-control" id="exampleInputPassword1" />
                </div>
              </div>
            </div>
            {/* -------------------------------------------------- */}
            <div className="row">
              <div className="col">
                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label">Phone</label>
                  <input type="text" className="form-control" id="lastName" />
                </div>
              </div>
              <div className="col">
                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label">DNI</label>
                  <input type="text" className="form-control" id="lastName" />
                </div>
              </div>
            </div>
            {/* -------------------------------------------------- */}
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">Adress</label>
              <input type="text" className="form-control" id="lastName" />
            </div>
            <div className="mb-3">
              <label htmlFor="formFile" className="form-label">Change your Avatar</label>
              <input className="form-control" type="file" id="formFile" />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
    )
}