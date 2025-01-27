import React from 'react';
import '../Styles/HomePageStyle.css'; // Import stylów

export default function HomePage() {
    return (
        <div className="home-page">
            <div className="home-content">
                <h1 className="home-title">Cleopatra Beauty Salon</h1>
                <p className="home-intro">
                    Witaj w Cleopatra Beauty Salon, miejscu, w którym piękno spotyka się z profesjonalizmem, a Twoje potrzeby stają się naszą pasją. Jako zespół doświadczonych specjalistów, staramy się nie tylko oferować usługi kosmetyczne na najwyższym poziomie, ale również stworzyć atmosferę, w której poczujesz się wyjątkowo. Naszą misją jest zadbać o Twoje ciało i umysł, oferując kompleksową opiekę, która pozwoli Ci poczuć się pięknie, zrelaksowanie i pewnie.
                </p>
                <p className="home-services">
                    Nasza oferta obejmuje szeroki wachlarz zabiegów pielęgnacyjnych, które zostały starannie wybrane, aby sprostać oczekiwaniom nawet najbardziej wymagających Klientów. Każdy zabieg, czy to na twarzy, ciele, dłoniach czy stopach, wykonywany jest z najwyższą precyzją i dbałością o detale. W Cleopatra Beauty Salon oferujemy m.in.:
                    <ul className="services-list">
                        <li className="service-item">Zabiegi na twarz, które pomagają utrzymać młody wygląd skóry, poprawiają jej jędrność i nawilżenie, a także niwelują zmarszczki i inne niedoskonałości. Dzięki nowoczesnym technologiom i wysokiej jakości kosmetykom, nasze terapie przynoszą szybkie i trwałe efekty.</li>
                        <li className="service-item">Zabiegi na ciało – od relaksujących masaży, przez modelowanie sylwetki, aż po oczyszczanie i nawilżanie skóry. Każdy zabieg jest dopasowany do Twoich indywidualnych potrzeb, a nasza oferta obejmuje również zabiegi detoksykacyjne i redukcji cellulitu.</li>
                        <li className="service-item">Depilacja – bezpieczne i skuteczne usuwanie zbędnego owłosienia za pomocą najnowszych technologii, w tym depilacji laserowej. Z nami zapomnisz o tradycyjnych metodach depilacji i poczujesz się gładko przez długi czas.</li>
                        <li className="service-item">Stylizacja paznokci – zarówno klasyczne manicure i pedicure, jak i nowoczesne zdobienia paznokci, w tym manicure hybrydowy, żelowy czy przedłużanie paznokci. W trosce o Twoje zdrowie, używamy tylko bezpiecznych i wysokiej jakości produktów.</li>
                    </ul>
                </p>
                <p className="home-safety">
                    Jako salon kosmetyczny, zdajemy sobie sprawę, jak ważne jest, by zabiegi były nie tylko skuteczne, ale również bezpieczne. Dlatego stawiamy na wysoką jakość usług oraz korzystanie z kosmetyków i sprzętu renomowanych marek. Nasz zespół nieustannie podnosi swoje kwalifikacje, śledząc najnowsze trendy i technologie, aby każda wizyta w Cleopatra Beauty Salon była niezapomnianym doświadczeniem.
                </p>
                <p className="home-atmosphere">
                    Jednak nasza oferta to nie tylko zabiegi – to także przestrzeń, w której możesz znaleźć spokój, odprężenie i chwile relaksu w przyjemnej atmosferze. Wierzymy, że piękno nie ogranicza się tylko do wyglądu zewnętrznego, ale także do wewnętrznej harmonii, której staramy się dostarczyć każdemu Klientowi. W naszym salonie możesz liczyć na pełne wsparcie, profesjonalną obsługę i przyjazną atmosferę.
                </p>
                <h2 className="why-choose-title">Dlaczego warto wybrać Cleopatra Beauty Salon?</h2>
                <ol className="reasons-list">
                    <li className="reason-item">Doświadczenie i profesjonalizm – Nasi specjaliści to osoby z pasją i doświadczeniem, które z zaangażowaniem podchodzą do każdego Klienta.</li>
                    <li className="reason-item">Indywidualne podejście – Każdy zabieg jest dopasowany do Twoich potrzeb i oczekiwań.</li>
                    <li className="reason-item">Nowoczesne technologie – Korzystamy z najnowszych osiągnięć kosmetologii, aby zapewnić Ci najlepsze efekty.</li>
                    <li className="reason-item">Bezpieczeństwo i komfort – Zapewniamy wysoki standard higieny i komfortu, by każda wizyta była przyjemnością.</li>
                </ol>
                <p className="home-conclusion">
                    Zadbaj o siebie w Cleopatra Beauty Salon i pozwól nam podkreślić Twoje naturalne piękno. Niezależnie od tego, czy marzysz o regeneracji skóry, modelowaniu sylwetki, czy po prostu o chwili relaksu – nasz salon to miejsce, które spełni Twoje oczekiwania.
                </p>
                <p className="home-reservation">
                    Zarezerwuj wizytę już teraz i przekonaj się, jak łatwo można poczuć się pięknie i wyjątkowo każdego dnia!
                </p>
            </div>
        </div>
    );
}
