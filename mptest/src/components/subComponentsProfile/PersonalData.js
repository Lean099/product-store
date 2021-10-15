export const PersonalData = ()=>{

    return(
        <div className="card mt-4">
        <img src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" class="mt-1" style={{borderRadius: '50%', width: '250px', height: '250px', marginLeft: 'auto', marginRight: 'auto'}} alt="imgUser"/>
        <div className="card-body d-grid">
          <div className="row">
            <div className="col">
              <p className=""><span className="fw-bold">First Name:</span> Leandro</p>
            </div>
            <div className="col">
              <p className=""><span className="fw-bold">Last Name:</span> Robledo</p>
            </div>
          </div>
          <div className="row">
          <div className="col">
              <p className=""><span className="fw-bold">Email:</span> lean@mail.com</p>
            </div>
          </div>
          <div className="row">
          <div className="col">
              <p className=""><span className="fw-bold">Phone:</span> 34294-24212355</p>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <p className=""><span className="fw-bold">DNI:</span> 53432423</p>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <p className=""><span className="fw-bold">Adress:</span> Calle 1 - Avenida Mitre</p>
            </div>
          </div>
          <div className="row"></div>
          <div className="row"></div>
        </div>
      </div>
    )
}