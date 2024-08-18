import { useState, useEffect } from "react";
// import { URL } from "../utils/constants";
import { useContext } from "react";
import GetPaidUser from "../utils/GetPaidUser";
import GetLentedUser from "../utils/GetLentedUser";
import { UserContext } from "../utils/userContext";
// import Cookies from "js-cookie";
import Comments from "./Comments";
import { useParams } from "react-router-dom";
import TotalNotes from "./Notes";
import Shares from "./Shares";
import Loading from "../utils/Loading";
import SuccessPopup from "../utils/SuccessPopUp";

const ShowTransactions = (props) => {
  const {
    transactions,
    SetDeleteReq,
    clicked,
    SetEditReq,
    ShowDetails,
    setShowIndex,
    setShowIndexDelete,
    LentedUsers,
  } = props;
  const { id } = useParams();
  console.log("transaction form show trans : ", transactions);
  // const [PaidUser, setPaidUser] = useState("");
  // const [LentedUser, setLentedUser] = useState("");
  const { user, login } = useContext(UserContext);
  //   console.log("PaidUser", PaidUser);
  //   console.log("LentedUser", LentedUser);

  // const PaidUser = GetLentedUser(transactions.paidBy); // this is paid user
  // updated :
  let PaidUser = transactions.paidBy.username;
  if (user._id.toString() === transactions.paidBy._id.toString()) {
    PaidUser = "you";
  }
  // -------------------------------------------------  -------------------------  lentTo should be
  const LentedUser = GetPaidUser(transactions, clicked); // this is lented user
  console.log("LentedUsers", LentedUser);
  const [TransactionType, SetTransactionType] = useState("");
  const [PopUpActive, setPopUpActive] = useState(false);
  const [User1, setUser1] = useState([]);
  const [User2, SetUser2] = useState([]);
  const [Description, SetDescription] = useState(transactions.description);
  const [Amount, SetAmount] = useState(transactions.amount_paid);
  const [Notes, setNotes] = useState([]);
  const [TransDate, SetTransDate] = useState(transactions.date);
  const [LastUpdatedDate, setLastUpdatedDate] = useState(null);

  const [Load, setLoad] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [Message, setMessage] = useState("");
  // const [LentedUsers, setLentedUsers] = useState([]);

  const [Calender, setCalender] = useState([
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ]);
  // console.log(TransactionType);
  const handleClick = () => {
    setShowIndex();
  };
  // console.log("Notes", Notes);
  // console.log("show trans called");
  // console.log("Usersssssss", User1, User2);

  // ------------------------------------------------------ no need -------------------------------------------

  // const getUser = async (id) => {
  //   const jsonData = await fetch(URL + "/getUser/" + id).then((res) =>
  //     res.json()
  //   );
  //   return jsonData;
  // };
  console.log("Lented users", PaidUser, LentedUser, LentedUsers, transactions);

  // ------------------------------------------------------ no need -------------------------------------------

  // const getLentedUsers = async () => {
  //   let AllUsers = [];

  //   for (let i = 0; i < transactions.lentTo.length; i++) {
  //     console.log(transactions.lentTo[i].userID);
  //     const jsonData = await fetch(
  //       URL + "/getUser/" + transactions.lentTo[i].userID
  //     ).then((res) => res.json());
  //     if (!AllUsers.includes(jsonData)) {
  //       AllUsers.push(jsonData);
  //     }
  //   }
  //   setLentedUsers(AllUsers);
  // };

  useEffect(() => {
    SetDescription(transactions.description);
    SetAmount(transactions.amount_paid);
    getNotes(transactions._id);
    // getLentedUsers();
    // getShares()
  }, [PopUpActive]);
  useEffect(() => {
    // ------------------------------------------------------ no need -------------------------------------------

    // getUser(transactions.paidBy).then((data) => {
    //   setUser1({ id: data._id, name: data.username });
    // });
    setUser1({
      id: transactions.paidBy._id,
      name: transactions.paidBy.username,
    });
    // getUser(id).then((data) => {
    //   SetUser2({ id: data._id, name: data.username });
    // });

    SetTransactionType(transactions.type);
  }, []);

  // ------------------------------------------------------ no need -------------------------------------------

  const getNotes = async (transactionId) => {
    const jsonData = await fetch(URL + "/getNotes/" + transactionId).then(
      (res) => res.json()
    );
    if (jsonData.msg) {
      alert(jsonData.msg);
    }
    setNotes(jsonData);
    if (jsonData.length !== 0) {
      // dont put Notes instead of jsonData, (giving error)
      setLastUpdatedDate(jsonData[jsonData.length - 1].date);
    } else {
      setLastUpdatedDate(null);
    }
  };

  const UpdateTransaction = async (Transaction) => {
    if (Cookies.get("user") === undefined) {
      alert("please login first");
      window.location = "/login";
    } else if (user._id !== JSON.parse(Cookies.get("user"))._id) {
      alert("something went wrong");
      login(JSON.parse(Cookies.get("user")));
    } else {
      setLoad(true);
      Transaction.clicked = clicked;
      Transaction.updatedBy = user._id;
      const jsonData = await fetch(URL + "/edit/" + transactions._id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Transaction),
      }).then((res) => res.json());
      if (jsonData.msg) {
        alert(jsonData.msg);
        setLoad(false);
      } else {
        // console.log("jsonData after edited", jsonData);

        // setNotes(jsonData);
        setLoad(false);
        setMessage("transaction updated successfully");
        setShowSuccessPopup(true);
        setPopUpActive(false);
        SetEditReq();
      }
    }
  };

  const handleDelete = async () => {
    // transactions.clicked = clicked;
    if (Cookies.get("user") === undefined) {
      alert("please login first");
      window.location = "/login";
    } else if (user._id !== JSON.parse(Cookies.get("user"))._id) {
      alert("something went wrong");
      login(JSON.parse(Cookies.get("user")));
    } else {
      setLoad(true);
      const clickType = { clicked: clicked };
      // console.log("deleting request recieved in client", transactions);
      // dont forgot to delete transactions from both users,merged,original transa
      // what if user clicked delete form all trans
      const jsonData = await fetch(URL + "/delete/" + transactions._id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(clickType),
      }).then((res) => res.json());
      // console.log("all changed ra babu", jsonData);
      setLoad(false);
      setMessage("transaction deleted successfully");
      setShowSuccessPopup(true);
    }

    setShowIndexDelete(); // 2
    SetDeleteReq(); // 3
  };

  const getDate = (transDate) => {
    let date = new Date(transDate);
    return date.getDate();
  };
  const getMonth = (transDate) => {
    let date = new Date(transDate);
    return Calender[date.getMonth()];
  };
  const getYear = (transDate) => {
    let date = new Date(transDate);
    return date.getFullYear();
  };
  // const monthAbbreviation = Calender[date.getMonth()];

  // useEffect(() => {
  //   // setPaidUser(getUser(transactions.paidBy));
  //   getUser(transactions.paidBy);
  //   // setPaidUser(data);
  //   getLentedUser(transactions.lentTo);
  // }, []);

  if (Load == true) {
    return <Loading />;
  }

  return (
    <div>
      {showSuccessPopup && (
        <SuccessPopup
          message={Message}
          setShowSuccessPopup={setShowSuccessPopup}
        />
      )}
      <div
        className="flex bg-white shadow-md transition-colors group duration-300 ease-in-out hover:bg-slate-100 cursor-pointer border-b-[1px] m-1 p-1 "
        onClick={handleClick}
      >
        <div className="flex flex-col items-center w[80px] mr-3">
          <div className="text-xs">{getMonth(TransDate)}</div>
          <div>{getDate(TransDate)}</div>
        </div>
        <div className="flex justify-between w-[500px]  ">
          {transactions.type === "settle" ? (
            <div>
              {/* {User1.name} paid  */}
              Payment
              {/* {User2.name} */}
            </div>
          ) : (
            <div>{transactions.description}</div>
          )}
          <div className="flex">
            <div className="mr-10 flex  flex-col  items-center">
              {/* <div> {PaidUser.username} paid</div> */}
              {PaidUser ? (
                <div className="text-xs ">
                  {PaidUser.length > 5 ? PaidUser.substring(0, 5) : PaidUser}{" "}
                  paid
                </div>
              ) : (
                ""
              )}
              {TransactionType === "expense" ? (
                <span>₹{transactions.amount_paid}</span>
              ) : (
                ""
              )}
            </div>
            <div className="flex flex-col items-center">
              {PaidUser && TransactionType === "expense" ? (
                <div className="text-xs">
                  {PaidUser.length > 5 ? PaidUser.substring(0, 5) : PaidUser}{" "}
                  lent{" "}
                  {LentedUser && LentedUser.length > 5
                    ? LentedUser.substring(0, 5)
                    : LentedUser}
                </div>
              ) : (
                ""
              )}
              {TransactionType === "expense" ? (
                transactions.paidBy._id.toString() === user._id.toString() ? (
                  <span className="text-green-500">
                    {/* -------------------------------------------------show total he lented ------------------------------------------------- */}
                    ₹
                    {clicked === "all"
                      ? transactions.totalLentedAmount
                      : transactions.lentedAmount}
                  </span>
                ) : (
                  <span className="text-red-500">
                    {/* ------------------------------------------------- show  */}
                    ₹{transactions.lentedAmount}
                  </span>
                )
              ) : transactions.paidBy._id.toString() === user._id.toString() ? (
                <span className="w-[20px] mr-8 text-green-500">
                  ₹{transactions.amount_paid}
                </span>
              ) : (
                <span className="w-[20px] mr-8 text-red-500">
                  ₹{transactions.amount_paid}
                </span>
              )}
            </div>
            <div>
              <div
                className="ml-4  cursor-pointer p-1 invisible group-hover:visible text-red-800"
                onClick={handleDelete}
              >
                X
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* after clicking on transaction  */}

      {ShowDetails ? (
        <div className=" bg-gray-100">
          <div className="p-2">
            <div className="  text-sm">
              Added by
              {/* {transactions.paidBy === User1.id ? ( */}
              <span> {User1.name}</span>
              {/* ) : ( */}
              {/* <span>{User2.name}</span> */}
              {/* )}{" "} */}
              on {getMonth(TransDate)} {getDate(TransDate)} {getYear(TransDate)}
            </div>

            {Notes.length === 0 ? null : (
              <div className="text-sm">
                Last updated by {Notes[Notes.length - 1].updatedBy.username} on{" "}
                {getMonth(LastUpdatedDate)} {getDate(LastUpdatedDate)}{" "}
                {getYear(LastUpdatedDate)}
              </div>
            )}
            {/* Edit */}
            <button
              className="bg-orange-500 text-white text-xs py-[2px] px-2 rounded-sm"
              onClick={() => setPopUpActive(true)}
            >
              Edit Payment
            </button>

            {PopUpActive ? (
              <div className="popup w-[300px] rounded-md border-black bg-gray-300 ">
                <div className="head bg-green-600 p-2 flex justify-between text-white font-semiboldbold ">
                  <div>Add an Expense</div>
                  <div
                    className="closePopup text-white fontw rounded-lg w-6 text-center cursor-pointer"
                    onClick={() => setPopUpActive(false)}
                  >
                    X
                  </div>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    const Transaction = {
                      description: formData.get("description"),
                      amount: formData.get("amount"),
                    };
                    UpdateTransaction(Transaction);
                  }}
                >
                  <input
                    className="p-2 m-1"
                    type="text"
                    name="description"
                    onChange={(e) => SetDescription(e.target.value)}
                    value={Description}
                  />
                  <input
                    className="p-2 m-1"
                    type="number"
                    name="amount"
                    onChange={(e) => SetAmount(parseFloat(e.target.value))}
                    value={Amount}
                  />
                  <button
                    type="button"
                    onClick={() => setPopUpActive(false)}
                    className="bg-stone-800 px-4 py-2 m-2 text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 m-2"
                  >
                    Save
                  </button>
                </form>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    const Transaction = {
                      description: formData.get("description"),
                      amount: formData.get("amount"),
                    };
                    UpdateTransaction(Transaction);
                  }}
                >
                  <input
                    className="p-2 m-1"
                    type="text"
                    name="description"
                    onChange={(e) => SetDescription(e.target.value)}
                    value={Description}
                  />
                  <input
                    className="p-2 m-1"
                    type="number"
                    name="amount"
                    onChange={(e) => SetAmount(parseFloat(e.target.value))}
                    value={Amount}
                  />
                  <button
                    type="button"
                    onClick={() => setPopUpActive(false)}
                    className="bg-stone-800 px-4 py-2 m-2 text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 m-2"
                  >
                    Save
                  </button>
                </form>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    const Transaction = {
                      description: formData.get("description"),
                      amount: formData.get("amount"),
                    };
                    UpdateTransaction(Transaction);
                  }}
                >
                  <input
                    className="p-2 m-1"
                    type="text"
                    name="description"
                    onChange={(e) => SetDescription(e.target.value)}
                    value={Description}
                  />
                  <input
                    className="p-2 m-1"
                    type="number"
                    name="amount"
                    onChange={(e) => SetAmount(parseFloat(e.target.value))}
                    value={Amount}
                  />
                  <button
                    type="button"
                    onClick={() => setPopUpActive(false)}
                    className="bg-stone-800 px-4 py-2 m-2 text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 m-2"
                  >
                    Save
                  </button>
                </form>
              </div>
            ) : (
              ""
            )}

            <div className="flex">
              <div className="flex-1">
                <Shares
                  transactions={transactions}
                  User1={User1}
                  LentedUsers={LentedUsers}
                />
              </div>
              <TotalNotes transactions={transactions} Notes={Notes} />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ShowTransactions;
