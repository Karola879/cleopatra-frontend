import React from 'react';
import '../Styles/TeamStyle.css';

export default function Team(){
    return (
        <div className='team-page'>
            <div className='header'>
                <h1>Nasz zespół - Profesjonaliści z Pasją</h1>
                <p>
                W naszym salonie kosmetycznym Marta, Anita i Bartosz tworzą zgrany zespół, który łączy profesjonalizm, pasję do piękna i indywidualne podejście do każdego klienta. Jesteśmy dumni, że możemy zaoferować wszechstronne usługi na najwyższym poziomie – niezależnie od tego, czy potrzebujesz kompleksowej pielęgnacji twarzy, stylizacji paznokci, makijażu, czy relaksujących zabiegów spa.
                </p>
            </div>
            <div className='list'>
                <h3>Poznaj nas bliżej</h3>
                <ul>
                    <li>
                        <img src="/Pictures/kobieta1.jpg" alt="Marta" width="50%"/>
                        <div className="info">
                            <strong>Marta:</strong>
                            <p>
                            Marta to serce naszego zespołu. Jej empatia i precyzja sprawiają, że każdy zabieg staje się wyjątkowym przeżyciem. Specjalizuje się w stylizacji paznokci i pielęgnacji twarzy, ale równie dobrze odnajduje się w masażach relaksacyjnych i depilacji. Marta stale poszerza swoją wiedzę, biorąc udział w branżowych szkoleniach i warsztatach, by zawsze być na bieżąco z najnowszymi trendami i technikami.
                            </p>
                        </div>
                    </li>
                    <li>
                        <img src="/Pictures/kobieta2.jpg" alt="Anita" width="50%"/>
                        <div className="info">
                            <strong>Anita:</strong>
                            <p>
                            Anita to mistrzyni detalu i harmonii. Dzięki niej każdy klient czuje się w pełni zaopiekowany. Od profesjonalnego makijażu, przez pielęgnację dłoni i stóp, aż po zabiegi liftingujące – Anita potrafi wszystko. Jej pasją jest tworzenie spersonalizowanych planów pielęgnacyjnych, które odpowiadają na indywidualne potrzeby skóry. Anita wierzy, że piękno zaczyna się od dobrego samopoczucia, dlatego zawsze dba o ciepłą atmosferę w trakcie wizyty.
                            </p>
                        </div>
                    </li>
                    <li>
                        <img src="/Pictures/mężczyzna1.jpg" alt="Bartosz" width="50%"/>
                        <div className="info">
                            <strong>Bartosz:</strong>
                            <p>
                            Bartosz to nasz specjalista od perfekcji. Z niezwykłą precyzją i spokojem wykonuje każdy zabieg, od zaawansowanej pielęgnacji twarzy po stylizację paznokci. Jego silną stroną są masaże, które nie tylko odprężają, ale również regenerują ciało i umysł. Bartosz uwielbia wyzwania – dla niego każdy klient to nowa historia i możliwość wykazania się kreatywnością.
                            </p>
                        </div>
                    </li>
                </ul>
                </div>
            <div className='footer'>
                <h3>Dlaczego my?</h3>
                <p>
                    Nie dzielimy zadań na sztywne role – każdy z naszych pracowników potrafi zadbać o wszystkie aspekty Twojej pielęgnacji. Dzięki temu możemy elastycznie dostosować się do Twoich potrzeb i zapewnić, że każda wizyta będzie idealnie dopasowana do Twoich oczekiwań. Nasz zespół nieustannie się rozwija, wprowadzając innowacyjne techniki i najlepsze produkty, abyś mógł cieszyć się efektami, które zachwycają.
                </p>
                <p>
                    Niezależnie od tego, czy odwiedzasz nas w celu relaksu, poprawy samopoczucia, czy na specjalną okazję – możesz być pewien, że jesteś w dobrych rękach. Zapraszamy serdecznie! Wspólnie zadbamy o Twoje piękno.
                </p>
            </div>
        </div>
    )
}