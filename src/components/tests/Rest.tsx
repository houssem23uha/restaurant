import { CustomerCreateForm } from "./Customer/CustomerCreateForm"
import { CustomerList } from "./Customer/CustomerList"
import { CustomerUpdateForm } from "./Customer/CustomerUpdateForm"

import React, { useState } from "react";


function Rest(){
      // Id pour test mise à jour (plus tard tu passes un id dynamique)
  const [editCustomerId, setEditCustomerId] = useState<number | null>(null);

    return(

          <div>
            <h2>Clients</h2>
      <CustomerList />

      <h2>Créer un client</h2>
      <CustomerCreateForm />

      {editCustomerId !== null && (
        <>
          <h2>Modifier un client</h2>
          <CustomerUpdateForm id={editCustomerId} />
        </>
      )}

      {/* Exemple pour lancer un update sur un id 1 */}
      <button onClick={() => setEditCustomerId(1)}>Modifier client ID 1</button>
      <hr/>
      <hr/>
          </div>
      
    )
}

export default Rest