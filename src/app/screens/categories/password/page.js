import { cookies } from "next/headers";
import PasswordTable from "@/components/Table";

const Password = () => {
    const cookieStore = cookies();
    const access = cookieStore.get("showPasswordRoute");

    if (!access || access.value !== "true") {
        return (
            <div style={{ padding: "2rem", color: "red", textAlign: "center" }}>
                ❌ Access Denied – You are not authorized to view this page.
            </div>
        );
    }

    // Sample data (server side)
    const initialData = [
        {
            app: "Mobile",
            email: "mianzainch000@gmail.com",
            password: "zainch26191438211",
        },
        {
            app: "Laptop",
            email: "zainishfaq081@gmail.com",
            password: "1234432112344321",
        },
        {
            app: "Linkdin",
            email: "mianzainch000@gmail.com",
            password: "Zainch211!@#",
        },
        { app: "Rozze", email: "mianzainch000@gmail.com", password: "Zainch211!@" },
        {
            app: "ChatGPT",
            email: "mianzainch000@gmail.com",
            password: "Zainch211@",
        },
        {
            app: "Gramerly",
            email: "mianzainch000@gmail.com",
            password: "Zainch211!",
        },
        {
            app: "Overleaf",
            email: "mianzainch000@gmail.com",
            password: "Zainch211!@#$",
        },
        {
            app: "Github : username:(mianzainch000)",
            email: "mianzainch000@gmail.com",
            password: "ZainIshfaq211!",
        },
        {
            app: "Github : username:(zainishfaq081)",
            email: "zainishfaq081@gmail.com",
            password: "Zain23021999",
        },
        {
            app: "Netlify",
            email: "mianzainch000@gmail.com",
            password: "mianzainch000",
        },
        {
            app: "Netlify",
            email: "zainishfaq081@gmail.com",
            password: "zainishfaq081",
        },
        {
            app: "Zoom App",
            email: "zainishfaq081@gmail.com",
            password: "Zainch211!",
        },
        {
            app: "Udemy",
            email: "shahzebjadoon0@gmail.com",
            password: "anaconda123",
        },
        {
            app: "Vanced Youtube",
            email: "lordasif1234@gmail.com",
            password: "lord0000",
        },
        {
            app: "Vanced Youtube(Zain)",
            email: "zainishfaq203@gmail.com",
            password: "Zainch211@#",
        },
        {
            app: "Vanced Youtube(Mama)",
            email: "zainishfaq231999@gmail.com",
            password: "Zainch211!@#",
        },
        {
            app: "ExpenseTracker",
            email: "expensetracker637@gmail.com",
            password: "Zain05061999",
        },
        {
            app: "Wifi",
            email: "Admin Username",
            password: "telecomadmin",
        },
        {
            app: "Wifi",
            email: "Admin Password",
            password: "admintelecom",
        },
        {
            app: "Android Watch App Mibro",
            email: "mianzainch000@gmail.com",
            password: "261914211Z",
        },
        {
            app: "JazzCash",
            email: "",
            password: "1963",
        },
        {
            app: "Easypaisa",
            email: "",
            password: "10263",
        },
        {
            app: "Taylor Nap",
            email: "",
            password: "8348",
        },
        {
            app: "Dewoo Express Application",
            email: "",
            password: "1234567890",
        },
        {
            app: "Food Panda",
            email: "",
            password: "fokuson211",
        },
        {
            app: "Allied Bank Account Number",
            email: "10086389380010",
            password: "",
        },
        {
            app: " Allied Bank ATM Card",
            email: "",
            password: "2131",
        },
        {
            app: "Allied Bank Application ",
            email: "username (zain211)",
            password: "Zain@2302",
        },
        {
            app: "SadaPay",
            email: "",
            password: "12457",
        },
        {
            app: "Sadapay Iban Number  ",
            email: "PK90SADA0000003417872458",
            password: "",
        },
        {
            app: "Sadapay Card Password ",
            email: "",
            password: "4394",
        },
        {
            app: "Askari Bank Account Number",
            email: "1000320237343",
            password: "",
        },
        {
            app: "Nayapay",
            email: "zainishfaq211@nayapay",
            password: "Zain2399!",
        },
        {
            app: "Nayapay Card Password",
            email: "",
            password: "990223",
        },
        {
            app: "Nayapay ATM Password",
            email: "",
            password: "1707",
        },
        {
            app: "Nayapay(Question)",
            email: "day born",
            password: "Tuesday",
        },
        {
            app: "Nayapay(Question)",
            email: "grandmother name",
            password: "Halima Bibi",
        },
        {
            app: "Binance",
            email: "mianzainch000@gmail.com",
            password: "Zainch211@#£",
        },
        {
            app: "Smart Power App (Meter)",
            email: "mianzainch000@gmail.com",
            password: "Zainch211!@#",
        },
        {
            app: "Weather Api Key",
            email: "5826497ff4ff4566874142923242312",
            password: "",
        },
        {
            app: "npmjs.com",
            email: "mianzainch000@gmail.com",
            password: "userName: zain211  Password: Zainch211!",
        },
        {
            app: "Atiqa Gujranwala Adress",
            email: "EE Ext 61 house wafay block city housing society gujranwala",
            password: "",
        },
    ];

    return (
        <div style={{ padding: "2rem" }}>
            <h1>🔒 Secret Password Page</h1>
            <p>Only visible if you entered the correct Special Code at login.</p>

            {/* Client-side component */}
            <PasswordTable initialData={initialData} />
        </div>
    );
};
export default Password;
