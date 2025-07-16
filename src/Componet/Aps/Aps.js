 import React, { useEffect, useState } from 'react';
import './Aps.css';

const donorNames = [
  "Adam Smith", "محمد علي", "Sarah Johnson", "علي حسن", "Emily Davis", "يوسف سالم",
  "Olivia Brown", "سارة محمود", "Liam Wilson", "خالد عبد الله", "Noah Moore", "ليلى أحمد",
  "Emma Taylor", "عمر مصطفى", "Ava Anderson", "هالة سعيد", "Isabella Thomas", "زياد ناصر",
  "Mason Jackson", "رنا جمال", "Sophia White", "سامر إبراهيم", "Logan Harris", "نوران طارق",
  "Lucas Martin", "رامي يوسف", "Ethan Thompson", "ندى إبراهيم", "James Garcia", "مازن علي",
  "Benjamin Martinez", "سلمى محمود", "Elijah Robinson", "طارق حسن", "Oliver Clark", "ريان عبد الله",
  "Jacob Rodriguez", "باسم خالد", "Michael Lewis", "لمى يوسف", "Alexander Lee", "إياد عبد الرحمن",
  "Daniel Walker", "حلا مصطفى", "Henry Hall", "عادل حسن", "Jackson Allen", "رنا محمود",
  "Sebastian Young", "مهند طارق", "Jack King", "رنا أحمد", "Aiden Wright", "آدم خالد",
  "Matthew Scott", "جنى فهد", "Samuel Green", "يوسف عبد الله", "David Baker", "مها سعيد",
  "Joseph Adams", "رائد محمد", "Carter Nelson", "جميلة علي", "Owen Carter", "بشار محمود",
  "Wyatt Mitchell", "سارة عبد العزيز", "John Perez", "عمار حسن", "Jack Collins", "ندى خالد",
  "Luke Stewart", "هيثم يوسف", "Dylan Sanchez", "لمياء محمود", "Grayson Morris", "سامر عبد الرحمن",
  "Levi Rogers", "رؤى طارق", "Isaac Reed", "رائد يوسف", "Gabriel Cook", "لمى سعيد",
  "Julian Morgan", "محمود حسن", "Mateo Bell", "عفاف خالد", "Anthony Murphy", "طارق عبد الله",
  "Jaxon Bailey", "سارة يوسف", "Lincoln Rivera", "خالد محمود", "Joshua Cooper", "لمى فهد",
  "Christopher Richardson", "رامي عبد الرحمن", "Andrew Cox", "ندى مصطفى", "Theodore Howard", "يوسف حسن",
  "Caleb Ward", "رنا محمود", "Ryan Torres", "هشام خالد", "Asher Peterson", "مها عبد الله",
  "Nathan Gray", "طارق يوسف", "Thomas Ramirez", "سلمى سعيد"
];

const donorsToShow = 12;
const maxDonation = 57;

function Aps() {
  const [donors, setDonors] = useState([]);

  const generateDonors = () => {
    const newDonors = [];
    for (let i = 0; i < donorsToShow; i++) {
      const randomIndex = Math.floor(Math.random() * donorNames.length);
      const donationAmount = (Math.random() * maxDonation).toFixed(2);
      newDonors.push({
        name: donorNames[randomIndex],
        amount: donationAmount
      });
    }
    setDonors(newDonors);
  };

  useEffect(() => {
    generateDonors(); // أول مرة
    const interval = setInterval(() => {
      generateDonors(); // كل 2 ثانية
    }, 2000);

    return () => clearInterval(interval); // تنظيف
  }, []);

  return (
    <div className="App">
       

      <div className="main" id="donorsPage">
        <h2>قائمة المتبرعين</h2>
        <div id="donorsList">
          {donors.map((donor, index) => (
            <div className="donor-card" key={index}>
              <span>{donor.name}</span>
              <span className="donation-amount">{donor.amount} $</span>
            </div>
          ))}
        </div>
      </div>
 
    </div>
  );
}

export default Aps;