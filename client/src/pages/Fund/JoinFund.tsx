import { useLocation, useNavigate } from "react-router-dom"
import { useContext, useEffect } from "react";
import GlobalContext from "@/context/GlobalContext";
import FundContext from "@/context/FundContext";
import Success from "@/components/funds/Success";

const JoinFund = () => {
  const location = useLocation()
  const navigate = useNavigate();
  let id = location.pathname.split("/")[2];

  const { joinFund } = useContext(FundContext);
  const {setLoading, toastMessage} = useContext(GlobalContext);

  useEffect(() => {
    if (id) {
      handleJoin();
    }else{
      navigate("/");
      toastMessage("Invalid fund", "error");
    }
  }, []);

  const handleJoin = async () => {
    setLoading(true);
    const success = await joinFund(id);
    if (success) {
      setLoading(false);
    }else{
      navigate("/");
      setLoading(false);
    }
  }
  return (
    <div>
      <Success />
    </div>
  )
}

export default JoinFund