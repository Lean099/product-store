import { useState } from "react"
import axios from "axios";

export const TestRequest = ()=>{

    const [file, setFile] = useState(null)

    const handleFile = (e)=>{
        setFile(e.target.files[0])
        console.log(file)
    }

    const sendProduct = async (e)=>{
        e.preventDefault()
        const formData = new FormData()
        formData.append('file', file)
        console.log(file)
        await axios.post(`http://localhost:3001/api/product/test/`, formData)
    }

    return(
        <div className="container w-50 my-3">
        <form className="d-grid"> 
            <div className="row">
              <div className="col">
                <div className="card">
                  <div className="card-body">
                    <div className="row pb-3">
                      <div className="col">
                              <label for="image" class="form-label">Product image</label>
                              <input type="file" onChange={handleFile} class="form-control" id="image" />
                              <div class="valid-feedback">
                                Looks good!
                              </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                              <button onClick={sendProduct} className="btn btn-dark w-100">Submit</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </form>
    </div>
    )
}