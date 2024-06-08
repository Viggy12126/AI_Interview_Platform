import React, { useState,useEffect } from 'react'
import { buySubscription } from '../../redux/actions/user.js';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';


const Price = ({user}) => {

  const [key, setKey] = useState('');
  const dispatch = useDispatch();

  const { loading, error, subscriptionId } = useSelector(
    state => state.subscription
  );

  
  const subscribeHandler = async () => {
   const res = await fetch(`/api/v1/razorpaykey`);
   const data=await res.json();

    console.log(data);

    setKey(data.key);
    dispatch(buySubscription());
  };

  useEffect(() => {

    if (error) {
      // toast.error(error);

      toast(error, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
       
        });

      // dispatch({ type: 'clearError' });
    }

    if (subscriptionId) {
      const openPopUp = () => {
        const options = {
          key,
          name: 'AI Interview',
          description: 'Get access to all premium content',
          subscription_id: subscriptionId,
          callback_url: `/api/v1/paymentverification`,
          prefill: {
            name: user.name,
            email: user.email,
            contact: '',
          },
          notes: {
            address: 'AI Powered Mock Interview Platform',
          },
          theme: {
            color: '#FFC800',
          },
        };

        const razor = new Razorpay(options);
        razor.open();
      };
      openPopUp();
    }
  }, [
    dispatch,
    error,
    user.name,
    user.email,
    key,
    subscriptionId,
  ]);
  return (
    <div  className=" flex flex-col items-center justify-center">

      
      <div >
 <h1 className='text-white text-5xl  font-bold'>Choose the best plan for you
</h1>
</div>
<span className="text-blue-500 text-3xl my-4">and start learning</span>

<div className='bg-white  w-[450px]  overflow-hidden shadow-xl rounded-xl py-[20px]'>

<div className='text-2xl px-[150px] my-[10px]'>
    <h1 >Pro plan</h1>
    <div>
    <h1 className='font-bold text-blue-500'>₹999</h1>
    </div>
</div>

<div>
<h1 className='px-[30px] text-xxl'>Save with our Pro plan - the perfect balance of flexibility and commitment. Enjoy all features:</h1>
</div>


    <ul className='px-[50px] my-[20px] list-disc'>
        <li>Unlimited AI mock interviews</li>
        <li>Interactive Practice Simulations</li>
        <li>Quick Onboarding</li>
        <li>Benefit feedbacks from AI to boost your interview success.</li>
        <li>Scalable and Affordable Pricing</li>
    </ul>


<div className='px-[150px]'>
    <button onClick={subscribeHandler} className='bg-blue-600 hover:bg-blue-800  text-white  rounded-xl px-[8px] py-[4px]'>Get Started Now</button>
</div>

</div>
    </div>
  )
}

export default Price