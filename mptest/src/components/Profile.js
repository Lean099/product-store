import { useAuth0 } from "@auth0/auth0-react";

import 'bootstrap/dist/js/bootstrap.js';
import { NavLink } from "react-router-dom";
import axios from "axios";

import { UpdateUser } from './subComponentsProfile/UpdateUser'
import { PurchasesMade } from './subComponentsProfile/PurchasesMade'
import { SalesMade } from './subComponentsProfile/SalesMade'
import { PersonalData } from "./subComponentsProfile/PersonalData";
import { Settings } from "./subComponentsProfile/Settings";
import { useEffect, useState } from "react";

export const Profile = ()=>{

  const { user } = useAuth0()
  const [data, setData] = useState(null)

  useEffect(()=>{
    axios.get(`http://localhost:3001/api/user/UaG/${user.sub.replace('auth0|', '')}`).then(dataRes =>{
      setData(dataRes)
    })
  }, [])

  return(
    <div className="row">
  <div className="col-3">
    <div class="list-group" id="list-tab" role="tablist">
      <NavLink class="list-group-item list-group-item-action active p-2 d-flex justify-content-center fs-6" id="list-home-list" data-bs-toggle="list" to="#list-home" role="tab" aria-controls="list-home">Personal Data</NavLink>
      <NavLink class="list-group-item list-group-item-action p-2 d-flex justify-content-center fs-6" id="list-profile-list" data-bs-toggle="list" to="#list-profile" role="tab" aria-controls="list-profile">Purchases Made</NavLink>
      <NavLink class="list-group-item list-group-item-action p-2 d-flex justify-content-center fs-6" id="list-messages-list" data-bs-toggle="list" to="#list-messages" role="tab" aria-controls="list-messages">Sales Made</NavLink>
      <NavLink class="list-group-item list-group-item-action p-2 d-flex justify-content-center fs-6" id="list-settings-list" data-bs-toggle="list" to="#list-settings" role="tab" aria-controls="list-settings">Settings</NavLink>
      <PersonalData/>
    </div>
  </div>
  <div className="col-9">
    <div class="tab-content" id="nav-tabContent">
      <div class="tab-pane fade show active m-3" id="list-home" role="tabpanel" aria-labelledby="list-home-list"><UpdateUser/></div>
      <div class="tab-pane fade m-3" id="list-profile" role="tabpanel" aria-labelledby="list-profile-list"><PurchasesMade/></div>
      <div class="tab-pane fade m-3" id="list-messages" role="tabpanel" aria-labelledby="list-messages-list"><SalesMade/></div>
      <div class="tab-pane fade m-3" id="list-settings" role="tabpanel" aria-labelledby="list-settings-list"><Settings/></div>
    </div>
  </div>
</div>
  )
}