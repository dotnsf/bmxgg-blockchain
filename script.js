const NS = 'org.bmxgg';

/**
 * Transfer Processer
 * @param {org.bmxgg.ChangeOwner} tx- transaction parameters.
 * @transaction
 */
async function transfer(tx){
  const blood_id = tx.blood_id;
  const user_id = tx.user_id;
  
  try{
    if( user_id != '' ){
      const pr = await getParticipantRegistry( NS + '.User' );
      const exists = await pr.exists( user_id );
      if( !exists ){
        throw new Error( 'User does NOT exist! ID: ' + user_id );
      }
    
      const user = await pr.get( user_id );
      const ar = await getAssetRegistry( NS + '.Blood' );
      const blood = await ar.get( blood_id );
      if( blood.type != user.type ){
        throw new Error( 'Blood types NOT matched.' );
      }else{
        blood.user_id = user_id;
        await ar.update( blood );
      }
    }else{
      throw new Error( 'user_id NOT specified.' );
    }
  }catch( err ){
    throw new Error( err );
  }
}
