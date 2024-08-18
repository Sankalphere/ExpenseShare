import { useState, useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "./userContext";
import { URL } from "./constants";
import { useParams } from "react-router-dom";

const GetPaidUser = (transaction, clicked) => {
  const { id } = useParams();
  // console.log("is there any friend id : ", id);
  const [PaidUser, setPaidUser] = useState("");
  const { user } = useContext(UserContext);
  useEffect(() => {
    // if (id === undefined || id === null) {
    //   setPaidUser("");

    // }
    //  else {
    getUser();
    // }
  }, [id]);
  const getUser = async () => {
    // i made this call to get username

    // console.log("filterr ledhu anta : ", transaction);
    // let getId = transaction.lentTo.filter((lented) => lented.userID === id);
    let getId = false;
    let friend = null;
    transaction.lentTo.forEach((obj) => {
      // console.log("blah blah blah : ", obj.userID, id);
      if (obj.userID._id === id) {
        getId = true;
        friend = obj.userID.username;
      }
    });

    if (transaction.lentTo.length === 1) {
      getId = true;
      friend = transaction.lentTo[0].userID.username;
    }

    // console.log(
    //   "muk lent muk anta : lol skdajfa;olesdkjfaslekdfkjlsdfkjsdf : ",
    //   getId
    // );
    if (getId === false && clicked !== "all") setPaidUser("You");
    // updated -----------
    else {
      setPaidUser(friend);
    }

    // deleted ------------

    // else {
    //   const jsonData = await fetch(URL + "/getUser/" + id).then((res) =>
    //     res.json()
    //   );
    //   // check if user exists ... then apply operations
    //   // if (user._id.toString() === jsonData._id.toString()) {
    //   //   setPaidUser("you");
    //   // } else {
    //   setPaidUser(jsonData.username);
    // }
    // }
  };
  return PaidUser;
};

export default GetPaidUser;
