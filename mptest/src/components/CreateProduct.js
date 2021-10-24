import { useAuth0 } from "@auth0/auth0-react"
import axios from "axios"
import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"

export const CreateProduct = ()=>{

  const history = useHistory()
  const {user} = useAuth0()
  const {id} = useParams()

  const [edit , setEdit] = useState(false)
  const [datos, setDatos] = useState({
    title: '',
    price: '',
    quantity: '',
    description: ''
  })
  const [urlImage, setUrlImage] = useState('')
  const [file, setFile] = useState(null)

  useEffect(()=>{
    if(id){
      setEdit(true)
      axios.get(`http://localhost:3001/api/product/singleProduct/${id}`).then(res =>{
        setDatos({
          title: res.data.product.title,
          price: res.data.product.price,
          quantity: res.data.product.quantity,
          description: res.data.product.description
        })
        setUrlImage(res.data.product.image)
      })
    }
  }, [])

  const handleInputChange = (event) => {
    setDatos({
        ...datos,
        [event.target.name] : event.target.value
    })
    console.log(datos)
  }

  const handleFile = (e)=>{
    setFile(e.target.files[0])
    console.log(file)
  }

  const resetInputFile = (e)=>{
    document.getElementById("image").value = "";
  }

  const sendProduct = async (e)=>{
    e.preventDefault()
    if(edit){
      const formData = new FormData()
      formData.append('title', datos.title)
      formData.append('price', datos.price)
      formData.append('quantity', datos.quantity)
      formData.append('description', datos.description)
      formData.append('file', file)
      await axios.post(`http://localhost:3001/api/product/UaD/${id}`, formData)
      setEdit(false)
      history.push('/')
    }else{
      const formData = new FormData()
      formData.append('title', datos.title)
      formData.append('price', datos.price)
      formData.append('quantity', datos.quantity)
      formData.append('description', datos.description)
      formData.append('file', file)
      await axios.post(`http://localhost:3001/api/product/CaG/${user.sub.replace('auth0|', '')}`, formData)
      history.push('/')
    }
  }

    return(
      <div className="container w-50 my-3">
      <form className="d-grid">
          <div className="row">
            <div className="col">
              <div className="card">
                <img src={urlImage} class="card-img-top img-fluid rounded" alt=""/>
                <div className="card-body">
                  <div className="row pb-2">
                    <div className="col">
                            <label for="producto" class="form-label">Title Product</label>
                            <input type="text" class="form-control" name="title" value={datos.title} onChange={handleInputChange} id="product" placeholder="Sneakers..." required/>
                            <div class="valid-feedback">
                              Looks good!
                            </div>
                      </div>
                      <div className="col">
                            <label for="price" class="form-label">Price</label>
                            <div className="input-group">
                                <span class="input-group-text ">$</span>
                                <input type="text" class="form-control" name="price" value={datos.price} onChange={handleInputChange} id="price" placeholder="$9.99..." required/>
                                <div class="valid-feedback">
                                  Looks good!
                                </div>
                            </div>   
                      </div>
                      <div className="col">
                            <label for="quantity" class="form-label">Quantity</label>
                            <input type="text" class="form-control" name="quantity" value={datos.quantity} onChange={handleInputChange} id="quantity" placeholder="10..." required/>
                            <div class="valid-feedback">
                                Looks good!
                            </div>
                      </div>
                  </div>
                  <div className="row pb-2">
                      <div className="col">
                            <label for="descriptionPro" class="form-label">Product description</label>
                            <textarea class="form-control" name="description" value={datos.description} onChange={handleInputChange} id="descriptionPro" placeholder="Sneakers for sports..." required></textarea>
                            <div class="valid-feedback">
                              Looks good!
                            </div>
                        </div>
                  </div>
                  <div className="row pb-3">
                    <div className="col">
                            <label for="image" class="form-label">Product image</label>
                            <div className="input-group">
                                <input type="file" class="form-control" name="file" onChange={handleFile} id="image" aria-describedby="image" aria-label="Upload" required />
                                <button class="btn btn-dark" onClick={resetInputFile} type="button" id="image">
                                      <div class="btn-close btn-close-white"></div>
                                </button>
                            </div>
                            <div class="valid-feedback">
                              Looks good!
                            </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                            <button onClick={sendProduct} type="submit" className="btn btn-dark w-100">Submit</button>
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