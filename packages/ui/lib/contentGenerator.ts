import { Lang } from '../types';
import { liveCountries } from '../constants';
import { words } from '../constants/words';
import dotenv from 'dotenv';





export const contentGenerator = (type:string, name:string, lang: Lang, offer?:string, offersList?:string,  couponCount?:number,dealCount?:any, count?:any ) => {

   const date = new Date();
   const monthRaw = date.toLocaleString('default', { month: 'long' });
   //@ts-ignore
   const month = words[monthRaw][lang];   
   const year = new Date().getFullYear();
   // todo: make it meaningful
 if (type == "seoTitle"){
   if (couponCount){
 switch(lang){
         case "en": return `${offer} ${name} Promo Codes, Coupons & Discounts | ${couponCount} + Offers ${month} ${year} - ${process.env.APP}`;
         case "ru": return `${offer} ${name} Промокоды, купоны и скидки | ${couponCount}+ предложений на ${month} ${year} - ${process.env.APP}`;
         case "ar": return `${offer} ${name} أكواد القسائم، العروض والخصومات | ${couponCount} + عروض ${month} ${year} - ${process.env.APP}`;
         case "es": return `${offer} ${name} Códigos promocionales, cupones y descuentos | ${couponCount} + Ofertas ${month} ${year} - ${process.env.APP}`;
      }
   }else{
      return `null`
   }
     
 }else if
   // todo: make it meaningful

(type == "seoDescription"){

   switch(lang){
      
      case "en": return `Latest ${offer} ${name} coupon codes, ${couponCount}+ offers & discounts for ${month} ${year}. All coupons are verified and updated daily.`;
      case "ru": return `Последние ${offer} промокоды ${name}, ${couponCount}+ предложений и скидок на ${month} ${year}. Все купоны проверены и обновляются ежедневно.`;
      case "ar": return `أحدث أكواد القسائم ${offer} ${name}، ${couponCount}+ عروض وخصومات لشهر ${month} ${year}. جميع القسائم موثقة ومحدثة يوميًا.`;
      case "es": return `Últimos códigos promocionales ${offer} ${name}, ${couponCount}+ ofertas y descuentos para ${month} ${year}. Todos los cupones están verificados y actualizados diariamente.`;
      
   }

}else if

(type == "homeTitle"){

   switch(lang){
   case "en": return `Best Deals, Coupons & Promo Codes | ${month} ${year}`;
   case "ru": return `Лучшие предложения, купоны и промокоды | ${month} ${year}`;
   case "ar": return `أفضل العروض وأكواد القسائم | ${month} ${year}`;
   case "es": return `Mejores ofertas, cupones y códigos promocionales | ${month} ${year}`;
   }

}else if

(type == "homeDescription"){

   switch(lang){
   case "en": return `Best place to find the active, exclusive deals for your favorite store. We have updated coupon codes and discounts for ${month} ${year}.`;
   case "ru": return `Лучшее место для поиска активных эксклюзивных предложений для вашего любимого магазина. У нас обновлены промокоды и скидки на ${month} ${year}.`;
   case "ar": return `أفضل مكان للعثور على الصفقات الحصرية النشطة لمتجرك المفضل. لدينا أكواد قسيمة وخصومات محدثة لشهر ${month} ${year}.`;
   case "es": return `El mejor lugar para encontrar las ofertas activas y exclusivas de tu tienda favorita. Hemos actualizado códigos de cupones y descuentos para ${month} ${year}.`;
   }


}else if

(type == "activeCouponsHeading"){
      switch(lang){
         case "en": return `Active ${name} Coupon Codes & Offers | ${month} ${year}`;
        case "ru": return `Активные промокоды и предложения ${name} | ${month} ${year}`;
         case "ar": return `أكواد القسائم والعروض النشطة ${name} | ${month} ${year}`;
         case "es": return `Códigos de cupón y ofertas activos de ${name} | ${month} ${year}`;
      }
   }else if
   //---------------- Expired Deals Heading ----------------//
(type == "expiredCouponsHeading"){
      switch(lang){
         case "en": return `${name} Expired Deals`;
        case "ru": return `Истекшие предложения ${name}`;
         case "ar": return `عروض ${name} منتهية الصلاحية`;
         case "es": return `Ofertas caducadas de ${name}`;
      }
   }else if

      //---------------- Popular Deals Heading ----------------//
(type == "popularCouponsHeading"){
      switch(lang){
         case "en": return `Popular ${name} Coupon Codes 2024`;
         case "ru": return `Популярные промокоды ${name} 2024`;
         case "ar": return `أكواد القسائم الشهيرة ${name} 2024`;
         case "es": return `Códigos de cupón populares de ${name} 2024`;
        
      }
   }else if


     //---------------- Store Page Heading ----------------//
//TODO: make it natural
(type == "storePageHeading"){
      switch(lang){
         case "en": return `${name} Coupons & Promo Codes | Verified ${month} ${year}`;
         case "ru": return `Купоны и промокоды ${name} | Проверено ${month} ${year}`;
      }
   }else if
//---------------- About Heading ----------------//

 (type == "aboutHeading"){
      switch(lang){
         case "en": return `About ${name}`;
        case "ru": return `О ${name}`;
         case "ar": return `حول ${name}`;
         case "es": return `Acerca de ${name}`;
      }
   }else if
//---------------- About Content ----------------//

 (type == "aboutContent"){
      switch(lang){
         case "en": return `${name} is offering ${couponCount || 1} coupons and ${dealCount || 1} deals today, and shoppers can save up to ${offer} on their orders. ${name} coupon codes are verified for ${month} ${year}`;
         case "ru": return `${name} предлагает ${couponCount || 1} купонов и ${dealCount || 1} сделок сегодня, и покупатели могут сэкономить до ${offer} на своих заказах. Купоны ${name} проверены на ${month} ${year}`;
         case "ar": return `تقدم ${name} ${couponCount || 1} قسيمة و ${dealCount || 1} صفقة اليوم، ويمكن للمتسوقين توفير ما يصل إلى ${offer} على طلباتهم. تم التحقق من أكواد القسائم ${name} لشهر ${month} ${year}`;
         case "es": return `${name} ofrece ${couponCount || 1} cupones y ${dealCount || 1} ofertas hoy, y los compradores pueden ahorrar hasta ${offer} en sus pedidos. Los códigos de cupón ${name} están verificados para ${month} ${year}`;
      }

   }else if

   //---------------- FAQ Heading ----------------//

(type == "faqHeading"){
      switch(lang){
         case "en":  return `${name} Frequently Asked Questions`;
         case "es":  return `Preguntas frecuentes sobre ${name}`; 
         case "fr":  return `Questions fréquemment posées sur ${name}`;
         case "de":  return `Häufig gestellte Fragen zu ${name}`;
         case "ru":  return `Часто задаваемые вопросы о ${name}`;
         case "da":  return `Ofte stillede spørgsmål om ${name}`;
         case "it":  return `Domande frequenti su ${name}`;
         case "cs":  return `Často kladené otázky o ${name}`;
         case "nl":  return `Veelgestelde vragen over ${name}`;
         case "no":  return `Ofte stilte spørsmål om ${name}`;
         case "pl":  return `Często zadawane pytania o ${name}`;
         case "sv":  return `Vanliga frågor om ${name}`;
         case "tr":  return `${name} Sıkça Sorulan Sorular`;
         case "uk":  return `Часті питання про ${name}`;
         case "ro":  return `Întrebări frecvente despre ${name}`;
         case "bg":  return `Често задавани въпроси за ${name}`;
         case "be":  return `Частыя пытанні пра ${name}`;
         case "fi":  return `Usein kysytyt kysymykset ${name}`;
         case "pt":  return `Perguntas frequentes sobre ${name}`;
         case "hr":  return `Često postavljana pitanja o ${name}`;
         case "sl":  return `Pogosta vprašanja o ${name}`;
         case "el":  return `Συχνές ερωτήσεις σχετικά με ${name}`;
         case "hu":  return `Gyakran Ismételt Kérdések ${name}`;
         case "sk":  return `Často kladené otázky o ${name}`;
         case "ga":  return `Ceisteanna Coitianta faoi ${name}`;
         case "ja":  return `${name} よくある質問`;
         case "zh-CN":  return `${name} 常见问题`;
         case "ko":  return `${name} 자주 묻는 질문`;
         case "ar":  return `أسئلة مكررة حول ${name}`;
         case "my":  return `Soalan Lazim tentang ${name}`;
         case "th":  return `คำถามที่พบบ่อยเกี่ยวกับ ${name}`;
         case "vi":  return `Câu hỏi thường gặp về ${name}`;
         case "tl":  return `Madalas Itanong Tungkol sa ${name}`;
         case "id":  return `Pertanyaan yang Sering Diajukan tentang ${name}`;
         case "ur":  return `${name} کے متعلق عام سوالات`;
         case "fa":  return `سوالات متداول درباره ${name}`;
         case "my":  return `${name} အသုံးပြုသော မေးခွန်းများ`;

      }

   }else if

    //---------------- Similar Stores ----------------//

(type == "similarStoresHeading"){
      switch(lang){
         case "en": return `${name} Similar Stores`;
         case "es": return `Tiendas similares a ${name}`;
         case "fr": return `Magasins similaires à ${name}`;
         case "de": return `Ähnliche Geschäfte wie ${name}`;
         case "ru": return `Похожие магазины на ${name}`;
         case "da": return `Lignende butikker som ${name}`;
         case "it": return `Negozi simili a ${name}`;
         case "cs": return `Podobné obchody jako ${name}`;
         case "nl": return `Vergelijkbare winkels als ${name}`;
         case "no": return `Lignende butikker som ${name}`;
         case "pl": return `Podobne sklepy jak ${name}`;
         case "sv": return `Liknande butiker som ${name}`;
         case "tr": return `${name} Benzer Mağazalar`;
         case "uk": return `Схожі магазини на ${name}`;
         case "ro": return `Magazine similare cu ${name}`;
         case "bg": return `Подобни магазини като ${name}`;
         case "be": return `Падобныя магазіны як ${name}`;
         case "fi": return `Samanlaiset kaupat kuin ${name}`;
         case "pt": return `Lojas semelhantes a ${name}`;
         case "hr": return `Slične trgovine kao ${name}`;
         case "sl": return `Podobne trgovine kot ${name}`;
         case "el": return `Παρόμοια καταστήματα με ${name}`;
         case "hu": return `Hasonló üzletek, mint a ${name}`;
         case "sk": return `Podobné obchody ako ${name}`;
         case "ga": return `Siopaí Cosúil le ${name}`;
         case "ja": return `${name} 類似の店舗`;
         case "zh-CN": return `${name} 类似商店`;
         case "ko": return `${name}와 유사한 상점`;
         case "ar": return `متاجر مماثلة لـ ${name}`;
         case "my": return `Kedai yang Sama dengan ${name}`;
         case "th": return `ร้านค้าที่คล้ายกันกับ ${name}`;
         case "vi": return `Cửa hàng Tương tự với ${name}`;
         case "tl": return `Katulad na mga Tindahan ng ${name}`;
         case "id": return `Toko Serupa dengan ${name}`;
         case "ur": return `${name} مماثل اسٹورز`;
         case "fa": return `فروشگاه های مشابه ${name}`;
         case "my": return `${name} ကြော်ငြာများ`;

         
      }

   }else if

    //---------------- offerStatsHeading ----------------//

(type == "offerStatsHeading"){

      switch(lang){
         case "en": return `${name}er Stats`;
         case "es": return `Estadísticas de ofertas de ${name}`;
         case "fr": return `Statistiques d'offres de ${name}`;
         case "de": return `${name} Angebotsstatistiken`;
         case "ru": return `Статистика предложений ${name}`;
         case "da": return `${name} Tilbud Statistikker`;
         case "it": return `Statistiche delle offerte di ${name}`;
         case "cs": return `Statistiky nabídek ${name}`;
         case "nl": return `${name} Aanbieding Statistieken`;
         case "no": return `${name} Tilbud Statistikk`;
         case "pl": return `Statystyki ofert ${name}`;
         case "sv": return `${name} Erbjudande Statistik`;
         case "tr": return `${name} Teklif İstatistikleri`;
         case "uk": return `Статистика пропозицій ${name}`;
         case "ro": return `Statistici de oferte ${name}`;
         case "bg": return `Статистика на оферти ${name}`;
         case "be": return `Статыстыка прапановаў ${name}`;
         case "fr": return `Statistiques d'offres de ${name}`;
         case "pt": return `Estatísticas de ofertas de ${name}`;
         case "hr": return `Statistika ponuda ${name}`;
         case "sl": return `Statistika ponudbe ${name}`;
         case "el": return `Στατιστικά προσφορών ${name}`;
         case "hu": return `${name} Ajánlat Statisztika`;
         case "sk": return `Štatistiky ponúk ${name}`;
         case "ga": return `Staitisticí Tairiscint ${name}`;
         case "ja": return `${name} オファー統計`;
         case "zh-CN": return `${name} 优惠统计`;
         case "ko": return `${name} 제공 통계`;
         case "ar": return `إحصائيات العروض ${name}`;
         case "my": return `Statistik Tawaran ${name}`;
         case "th": return `สถิติข้อเสนอ ${name}`;
         case "vi": return `Thống kê Ưu đãi ${name}`;
         case "tl": return `Estadistika ng Alok ng ${name}`;
         case "id": return `Statistik Penawaran ${name}`;
         case "ur": return `${name} آفر اسٹیٹس`;
         case "fa": return `آمار پیشنهاد ${name}`;
         case "my": return `${name} အသုံးပြုအတည်ပြုမှု`;

         
      }

   }else if

(type == "howToApplyHeading"){

      switch(lang){
         case "en": return `How to apply ${name} Coupon Codes ?`;
         case "es": return `¿Cómo aplicar los códigos de cupón de ${name}?`;
         case "fr": return `Comment appliquer les codes de coupon de ${name} ?`;
         case "de": return `Wie wende ich ${name} Gutscheincodes an ?`;
         case "ru": return `Как применить купоны ${name}?`;
         case "da": return `Sådan bruger du ${name} kuponkoder ?`;
         case "it": return `Come applicare i codici coupon di ${name} ?`;
         case "cs": return `Jak použít kupónové kódy ${name} ?`;
         case "nl": return `Hoe ${name} couponcodes toepassen ?`;
         case "no": return `Hvordan søke ${name} kupongkoder ?`;
         case "pl": return `Jak zastosować kody kuponów ${name} ?`;
         case "sv": return `Hur man ansöker om ${name} kupongkoder ?`
         case "tr": return `${name} Kupon Kodları Nasıl Uygulanır ?`;
         case "uk": return `Як застосувати купони ${name} ?`;
         case "ro": return `Cum se aplică codurile de cupon ${name} ?`;
         case "bg": return `Как да приложите кодовете за купони ${name} ?`;
         case "be": return `Як прымяніць купоны ${name} ?`;
         case "fi": return `Kuinka käyttää kuponkikoodeja ${name} ?`;
         case "pt": return `Como aplicar códigos de cupom ${name} ?`;
         case "hr": return `Kako primijeniti kupone ${name} ?`;
         case "sl": return `Kako uporabiti kupone ${name} ?`;
         case "el": return `Πώς να εφαρμόσετε τους κωδικούς κουπονιών ${name} ?`;
         case "hu": return `Hogyan alkalmazzuk a kuponkódokat ${name} ?`;
         case "sk": return `Ako aplikovať kupónové kódy ${name} ?`;
         case "ga": return `Conas códanna cupóin a chur i bhfeidhm ${name} ?`;
         case "ja": return `${name} クーポンコードを適用する方法 ?`;
         case "zh-CN": return `如何申请 ${name} 优惠券代码 ?`;
         case "ko": return `${name} 쿠폰 코드를 적용하는 방법 ?`;
         case "ar": return `كيفية تطبيق أكواد القسيمة ${name} ?`;
         case "my": return `Bagaimana Memohon Kod Kupon ${name} ?`;
         case "th": return `วิธีการใช้รหัสคูปอง ${name} ?`;
         case "vi": return `Làm thế nào để áp dụng mã giảm giá ${name} ?`;
         case "tl": return `Paano Mag-aplay ng Mga Coupon Code ng ${name} ?`;
         case "id": return `Bagaimana Menggunakan Kode Kupon ${name} ?`;
         case "ur": return `${name} کوپن کوڈ کیسے لاگو کریں ؟`;
         case "fa": return `چگونه کدهای کوپن ${name} را اعمال کنیم ؟`;
         case "my": return `${name} ကုန်ပစ္စည်းကုဒ်များကို ဘယ်လိုလွှဲပါသည် ?`;
      }

   }else if
(type == "howToApplyStep1"){
      switch(lang){
         case "en": return `Select a useful ${name} Promo Codes and click "Show Code" or "View Deal" button. A Popup will appear with Code, Link and Extra Information.`;
         case "es": return `Seleccione un útil ${name} Códigos de promoción y haga clic en el botón "Mostrar código" o "Ver oferta". Aparecerá un cuadro emergente con código, enlace e información adicional.`;
         case "fr": return `Sélectionnez un utile ${name} Codes promotionnels et cliquez sur le bouton "Afficher le code" ou "Voir l'offre". Une fenêtre contextuelle apparaîtra avec le code, le lien et des informations supplémentaires.`;
         case "de": return `Wählen Sie einen nützlichen ${name} Aktionscodes und klicken Sie auf die Schaltfläche "Code anzeigen" oder "Deal anzeigen". Ein Popup wird mit Code, Link und zusätzlichen Informationen angezeigt.`;
         case "ru": return `Выберите полезные ${name} Промокоды и нажмите кнопку "Показать код" или "Просмотреть предложение". Появится всплывающее окно с кодом, ссылкой и дополнительной информацией.`;
         case "da": return `Vælg en nyttig ${name} Kampagnekoder og klik på knappen "Vis kode" eller "Vis tilbud". En popup vises med kode, link og ekstra information.`;
         case "it": return `Seleziona un utile ${name} Codici promozionali e fai clic sul pulsante "Mostra codice" o "Visualizza offerta". Comparirà un popup con codice, link e informazioni aggiuntive.`;
         case "cs": return `Vyberte užitečné ${name} Promo kódy a klikněte na tlačítko "Zobrazit kód" nebo "Zobrazit nabídku". Zobrazí se vyskakovací okno s kódem, odkazem a dalšími informacemi.`;
         case "nl": return `Selecteer een nuttige ${name} Promotiecodes en klik op de knop "Code weergeven" of "Deal weergeven". Er verschijnt een pop-up met code, link en extra informatie.`;
         case "no": return `Velg en nyttig ${name} Kampanjekoder og klikk på knappen "Vis kode" eller "Vis tilbud". Et popup-vindu vises med kode, lenke og ekstra informasjon.`;
         case "pl": return `Wybierz przydatne ${name} Kody promocyjne i kliknij przycisk "Pokaż kod" lub "Pokaż ofertę". Wyświetli się okno popup z kodem, linkiem i dodatkowymi informacjami.`;
         case "sv": return `Välj en användbar ${name} Kampanjkoder och klicka på knappen "Visa kod" eller "Visa erbjudande". Ett popup-fönster visas med kod, länk och extra information.`;
         case "tr": return `Yararlı bir ${name} Promosyon Kodları seçin ve "Kodu Göster" veya "Fırsatı Görüntüle" düğmesine tıklayın. Bir açılır pencere, Kod, Bağlantı ve Ek Bilgiler ile görünecektir.`;
         case "uk": return `Виберіть корисні ${name} Промокоди та натисніть кнопку "Показати код" або "Показати пропозицію". З'явиться спливаюче вікно з кодом, посиланням та додатковою інформацією.`;
         case "ro": return `Selectați un ${name} Coduri promo utile și faceți clic pe butonul "Afișare cod" sau "Afișare ofertă". Va apărea un popup cu cod, link și informații suplimentare.`;
         case "bg": return `Изберете полезни ${name} Промоционални кодове и кликнете върху бутона "Покажи код" или "Покажи оферта". Ще се появи изскачащ прозорец с код, връзка и допълнителна информация.`;
         case "be": return `Выберыце карысныя ${name} Прома-коды і націсніце на кнопку "Паказаць код" або "Паказаць прапанову". З'явіцца выплываючае акно з кодам, спасылкай і дадатковай інфармацыяй.`;
         case "fi": return `Valitse hyödylliset ${name} Tarjouskoodit ja napsauta "Näytä koodi" tai "Näytä tarjous" -painiketta. Ponnahdusikkuna tulee näkyviin koodin, linkin ja lisätietojen kanssa.`;
         case "pt": return `Selecione um útil ${name} Códigos promocionais e clique no botão "Mostrar código" ou "Ver oferta". Aparecerá uma janela pop-up com código, link e informações adicionais.`;
         case "hr": return `Odaberite korisne ${name} Promo kodove i kliknite na gumb "Prikaži kod" ili "Prikaži ponudu". Pojaviti će se skočni prozor s kodom, vezom i dodatnim informacijama.`;
         case "sl": return `Izberite uporabne ${name} Promo kode in kliknite na gumb "Pokaži kodo" ali "Prikaži ponudbo". Pojavi se pojavno okno s kodo, povezavo in dodatnimi informacijami.`;
         case "el": return `Επιλέξτε ένα χρήσιμο ${name} Κωδικοί προσφοράς και κάντε κλικ στο κουμπί "Εμφάνιση κωδικού" ή "Εμφάνιση προσφοράς". Θα εμφανιστεί ένα αναδυόμενο παράθυρο με κωδικό, σύνδεσμο και επιπλέον πληροφορίες.`;
         case "hu": return `Válasszon egy hasznos ${name} Promóciós kódokat és kattintson az "Kód meg jelenítése" vagy "Ajánlat megtekintése" gombra. Egy felugró ablak jelenik meg a kóddal, a linkkel és az extra információkkal.`;
         case "sk": return `Vyberte užitočné ${name} Promo kódy a kliknite na tlačidlo "Zobraziť kód" alebo "Zobraziť ponuku". Zobrazí sa vyskakovacie okno s kódom, odkazom a ďalšími informáciami.`;
         case "ga": return `Roghnaigh ${name} Códanna Saincheaptha úsáideacha agus cliceáil ar an gcnaipe "Taispeáin an cód" nó "Taispeáin an tairge". Taispeánfar uinneag popup le cód, nasc agus eolas breise.`;
         case "ja": return `便利な ${name} プロモーションコードを選択し、「コードを表示」または「取引を表示」ボタンをクリックします。コード、リンク、追加情報が表示されるポップアップが表示されます。`;
         case "zh-CN": return `选择一个有用的 ${name} 促销代码，然后单击“显示代码”或“查看交易”按钮。将显示一个带有代码、链接和额外信息的弹出窗口。`;
         case "ko": return `유용한 ${name} 프로모션 코드를 선택하고 "코드 표시" 또는 "딜 표시" 버튼을 클릭하십시오. 코드, 링크 및 추가 정보가 포함된 팝업이 표시됩니다.`;
         case "ar": return `حدد ${name} أكواد العرض المفيدة وانقر فوق الزر "عرض الكود" أو "عرض الصفقة". سيظهر نافذة منبثقة مع الكود والرابط ومعلومات إضافية.`;
         case "my": return `Pilih ${name} Kod Promosi yang berguna dan klik butang "Tunjukkan Kod" atau "Lihat Tawaran". Popup akan muncul dengan Kod, Pautan dan Maklumat Tambahan.`;
         case "th": return `เลือก ${name} รหัสโปรโมชั่นที่มีประโยชน์และคลิกที่ปุ่ม "แสดงรหัส" หรือ "ดูข้อเสนอ" จะปรากฏป๊อปอัพพร้อมรหัส ลิงก์ และข้อมูลเพิ่มเติม`;
         case "vi": return `Chọn ${name} Mã giảm giá hữu ích và nhấn vào nút "Hiển thị mã" hoặc "Xem ưu đãi". Một cửa sổ bật lên sẽ xuất hiện với mã, liên kết và thông tin bổ sung.`;
         case "tl": return `Pumili ng mga kapaki-pakinabang na ${name} Promo Codes at i-click ang "Ipakita ang Code" o "Tingnan ang Deal" button. Ang isang Popup ay magpapakita ng Code, Link at Karagdagang Impormasyon.`;
         case "id": return `Pilih Kode Promo ${name} yang berguna dan klik tombol "Tampilkan Kode" atau "Lihat Penawaran". Popup akan muncul dengan Kode, Tautan, dan Informasi Tambahan.`;
         case "ur": return `ایک مفید ${name} پرومو کوڈ منتخب کریں اور "کوڈ دکھائیں" یا "ڈیل دیکھیں" بٹن پر کلک کریں۔ ایک پاپ اپ کوڈ، لنک اور اضافی معلومات کے ساتھ ظاہر ہوگا۔`;
         case "fa": return `یک ${name} کد تبلیغاتی مفید را انتخاب کرده و بر روی دکمه "نمایش کد" یا "نمایش معامله" کلیک کنید. یک پنجره Popup با کد، لینک و اطلاعات اضافی ظاهر می شود.`;
         case "my": return `အသုံးပြုသည့် ${name} ပရိုမိုးရှင်များကို ရွေးချယ်ပါ၊ "ကုဒ်ကို ပြပါ" သို့မဟုတ် "အော်ဒါကြည့်ပါ" ခလုတ်ကိုနှိပ်ပါ။ ကုဒ်၊ လင့်ခ်နှင့် အပ်ဒိတ်များဖြင့် Popup တစ်ခုဖြင့်ပြီးပြီ။`;

      }

   }else if
(type == "howToApplyStep2"){

      switch(lang){
         case "en": return `Copy the code and click on "Go to Store". You can also view vote history by previous users.`;
         case "es": return `Copie el código y haga clic en "Ir a la tienda". También puede ver el historial de votos de los usuarios anteriores.`;
         case "fr": return `Copiez le code et cliquez sur "Aller au magasin". Vous pouvez également consulter l'historique des votes par les utilisateurs précédents.`;
         case "de": return `Kopieren Sie den Code und klicken Sie auf "Zum Geschäft gehen". Sie können auch die Abstimmungsgeschichte der vorherigen Benutzer anzeigen.`;
         case "ru": return `Скопируйте код и нажмите "Перейти в магазин". Вы также можете просмотреть историю голосования предыдущих пользователей.`;
         case "da": return `Kopier koden og klik på "Gå til butik". Du kan også se stemmehistorikken fra tidligere brugere.`;
         case "it": return `Copia il codice e fai clic su "Vai al negozio". Puoi anche visualizzare la cronologia dei voti degli utenti precedenti.`;
         case "cs": return `Zkopírujte kód a klikněte na "Přejít do obchodu". Můžete také zobrazit historii hlasování předchozích uživatelů.`;
         case "nl": return `Kopieer de code en klik op "Naar winkel gaan". U kunt ook de stemgeschiedenis van eerdere gebruikers bekijken.`;
         case "no": return `Kopier koden og klikk på "Gå til butikk". Du kan også se stemmehistorikken til tidligere brukere.`;
         case "pl": return `Skopiuj kod i kliknij przycisk "Przejdź do sklepu". Możesz również zobaczyć historię głosowania poprzednich użytkowników.`;
         case "sv": return `Kopiera koden och klicka på "Gå till butik". Du kan också se rösthistoriken från tidigare användare.`;
         case "tr": return `Kodu kopyalayın ve "Mağazaya git" düğmesine tıklayın. Ayrıca önceki kullanıcıların oy geçmişini de görebilirsiniz.`;
         case "uk": return `Скопіюйте код і натисніть "Перейти в магазин". Ви також можете переглянути історію голосування попередніх користувачів.`;
         case "ro": return `Copiați codul și faceți clic pe "Mergeți la magazin". De asemenea, puteți vizualiza istoricul voturilor de către utilizatorii anteriori.`;
         case "bg": return `Копирайте кода и кликнете върху "Отиди в магазина". Можете също така да видите историята на гласуването от предишни потребители.`;
         case "be": return `Скапіруйце код і націсніце на "Перайсці ў магазін". Вы таксама можаце праглядзець гісторыю галасавання папярэдніх карыстальнікаў.`;
         case "fi": return `Kopioi koodi ja napsauta "Mene kauppaan". Voit myös tarkastella äänestyshistoriaa aiemmilta käyttäjiltä.`;
         case "pt": return `Copie o código e clique em "Ir para a loja". Você também pode ver o histórico de votos dos usuários anteriores.`;
         case "hr": return `Kopirajte kod i kliknite na "Idi u trgovinu". Također možete pregledati povijest glasanja prethodnih korisnika.`;
         case "sl": return `Kopirajte kodo in kliknite na "Pojdi v trgovino". Lahko si ogledate tudi zgodovino glasovanja prejšnjih uporabnikov.`;
         case "el": return `Αντιγράψτε τον κωδικό και κάντε κλικ στο "Μετάβαση στο κατάστημα". Μπορείτε επίσης να δείτε το ιστορικό ψηφοφορίας από προηγούμενους χρήστες.`;
         case "hu": return `Másold le a kódot és kattints az "Áruházba megy" gombra. Megtekintheted az előző felhasználók szavazástörténetét is.`;
         case "sk": return `Skopírujte kód a kliknite na "Ísť do obchodu". Môžete tiež zobraziť históriu hlasovania predchádzajúcich používateľov.`;
         case "ga": return `Cóipeáil an cód agus cliceáil ar "Téigh go dtí an Siopa". Is féidir leat staire vótaí na n-úsáideoirí roimhe sin a fheiceáil freisin.`;
         case "ja": return `コードをコピーして「ストアに移動」をクリックします。以前のユーザーによる投票履歴も表示できます。`;
         case "zh-CN": return `复制代码，然后单击“转到商店”。您还可以查看以前用户的投票历史。`;
         case "ko": return `코드를 복사하고 "상점으로 이동"을 클릭하십시오. 이전 사용자의 투표 기록도 볼 수 있습니다.`;
         case "ar": return `انسخ الكود وانقر فوق "انتقل إلى المتجر". يمكنك أيضًا عرض تاريخ التصويت من قبل المستخدمين السابقين.`;
         case "my": return `Salin kod dan klik "Pergi ke Kedai". Anda juga boleh melihat sejarah undian oleh pengguna sebelumnya.`;
         case "th": return `คัดลอกรหัสและคลิกที่ "ไปที่ร้าน". คุณยังสามารถดูประวัติการโหวตโดยผู้ใช้ก่อนหน้า.`;
         case "vi": return `Sao chép mã và nhấp vào "Đi đến cửa hàng". Bạn cũng có thể xem lịch sử bỏ phiếu của người dùng trước.`;
         case "tl": return `Kopyahin ang code at i-click ang "Pumunta sa Store". Maaari mo ring tingnan ang kasaysayan ng boto ng mga naunang gumagamit.`;
         case "id": return `Salin kode dan klik "Pergi ke Toko". Anda juga dapat melihat riwayat suara oleh pengguna sebelumnya.`;
         case "ur": return `کوڈ کاپی کریں اور "اسٹور جائیں" پر کلک کریں۔ آپ پچھلے صارفین کی ووٹ کی تاریخ بھی دیکھ سکتے ہیں۔`;
         case "fa": return `کد را کپی کرده و بر روی "به فروشگاه برو" کلیک کنید. همچنین می توانید تاریخچه رای گیری توسط کاربران قبلی را مشاهده کنید.`;
         case "my":   return `ကုဒ်ကို ကူးယူပါ၊ "ဆိုဒ်" `//todo

      }

   }else if
(type == "howToApplyStep3"){

      switch(lang){
         case "en": return `On checkout page of ${name} store, paste the code in the "Promo Code" box and click apply. Your discount will be applied.`;
         case "es": return `En la página de pago de la tienda ${name}, pegue el código en el cuadro "Código promocional" y haga clic en aplicar. Se aplicará su descuento.`;
         case "fr": return `Sur la page de paiement du magasin ${name}, collez le code dans la case "Code promotionnel" et cliquez sur appliquer. Votre réduction sera appliquée.`;
         case "de": return `Auf der Kassenseite des ${name} Geschäfts den Code in das Feld "Promo-Code" einfügen und auf "Anwenden" klicken. Ihr Rabatt wird angewendet.`;
         case "ru": return `На странице оформления заказа магазина ${name} вставьте код в поле "Промокод" и нажмите применить. Ваша скидка будет применена.`;
         case "da": return `På kassen side af ${name} butik, indsæt koden i "Promo Code" boksen og klik på anvend. Din rabat vil blive anvendt.`;
         case "it": return `Sulla pagina di pagamento del negozio ${name}, incolla il codice nella casella "Codice promozionale" e fai clic su applica. Lo sconto verrà applicato.`;
         case "cs": return `Na stránce pokladny obchodu ${name} vložte kód do pole "Promo Code" a klikněte na použít. Vaše sleva bude aplikována.`;
         case "nl": return `Op de afrekenpagina van de ${name} winkel, plak de code in het vak "Promotiecode" en klik op toepassen. Uw korting wordt toegepast.`;
         case "no": return `På utsjekkingssiden til ${name} butikk, lim inn koden i "Promo Code" -boksen og klikk på bruk. Rabatten din vil bli brukt.`;
         case "pl": return `Na stronie płatności sklepu ${name} wklej kod w pole "Kod promocyjny" i kliknij przycisk zastosuj. Twój rabat zostanie zastosowany.`;
         case "sv": return `På kassasidan för ${name} butik, klistra in koden i rutan "Kampanjkod" och klicka på tillämpa. Din rabatt kommer att tillämpas.`;
         case "tr": return `Ödeme sayfasında ${name} mağazasında, kodu "Promosyon Kodu" kutusuna yapıştırın ve uygulayın. İndiriminiz uygulanacaktır.`;
         case "uk": return `На сторінці оформлення замовлення магазину ${name} вставте код у поле "Промокод" і натисніть застосувати. Ваша знижка буде застосована.`;
         case "ro": return `Pe pagina de plată a magazinului ${name}, lipiți codul în caseta "Cod promoțional" și faceți clic pe aplicare. Reducerea dvs. va fi aplicată.`;
         case "bg": return `На страницата за плащане на магазина ${name} поставете кода в полето "Промоционален код" и кликнете върху прилагане. Вашият отстъп ще бъде приложен.`;
         case "be": return `На старонцы афармлення заказу магазіну ${name} уставіце код у поле "Прома-код" і націсніце на прымяніць. Ваша зніжка будзе прымяненая.`;
         case "fi": return `Maksusivulla ${name} -kaupassa liitä koodi "Promo Code" -ruutuun ja napsauta käytä. Alennuksesi tulee voimaan.`;
         case "pt": return `Na página de pagamento da loja ${name}, cole o código na caixa "Código promocional" e clique em aplicar. Seu desconto será aplicado.`;
         case "hr": return `Na stranici za odjavu trgovine ${name}, zalijepite kod u okvir "Promotivni kod" i kliknite na primijeni. Vaš popust će biti primijenjen.`;
         case "sl": return `Na strani za odjavo trgovine ${name} prilepite kodo v polje "Promocijska koda" in kliknite uporabi. Vaš popust bo uporabljen.`;
         case "el": return `Στη σελίδα πληρωμής του καταστήματος ${name}, επικολλήστε τον κωδικό στο πλαίσιο "Κωδικός προσφοράς" και κάντε κλικ στην εφαρμογή. Η έκπτωσή σας θα εφαρμοστεί.`;
         case "hu": return `A ${name} üzlet pénztári oldalán illessze be a kódot a "Promóciós kód" mezőbe, majd kattintson az alkalmazásra. A kedvezményt alkalmazzák.`;
         case "sk": return `Na stránke pokladne obchodu ${name} vložte kód do poľa "Promo Code" a kliknite na použiť. Vaša zľava bude aplikovaná.`;
         case "ga": return `Ar leathanach seiceála an siopa ${name}, péist an cód isteach sa bhosca "Cód Promo" agus cliceáil ar chur i bhfeidhm. Beidh do scairde curtha i bhfeidhm.`;
         case "ja": return `「ストアに移動」をクリックします。以前のユーザーによる投票履歴も表示できます。`;
         case "zh-CN": return `在 ${name} 商店的结帐页面上，将代码粘贴到“促销代码”框中，然后单击应用。您的折扣将被应用。`;
         case "ko": return `코드를 "상점으로 이동"을 클릭하십시오. 이전 사용자의 투표 기록도 볼 수 있습니다.`;
         case "ar": return `على صفحة الخروج من متجر ${name}، الصق الكود في مربع "كود الترويج" وانقر على تطبيق. سيتم تطبيق خصمك.`;
         case "my": return   `Pada halaman semak keluar kedai ${name}, tampal kod dalam kotak "Kod Promo" dan klik guna. Diskaun anda akan digunakan.`;
         case "th": return `ในหน้าชำระเงินของร้าน ${name} วางรหัสในช่อง "รหัสโปรโมชั่น" และคลิกใช้. ส่วนลดของคุณจะถูกใช้.`;
         case "vi": return `Trên trang thanh toán của cửa hàng ${name}, dán mã vào ô "Mã khuyến mãi" và nhấp vào áp dụng. Chiết khấu của bạn sẽ được áp dụng.`;
         case "tl": return `Sa pahina ng pagbabayad ng tindahan ng ${name}, i-paste ang code sa "Promo Code" box at i-click ang apply. Ang iyong diskwento ay magagamit.`;
         case "id": return `Di halaman checkout toko ${name}, tempelkan kode di kotak "Kode Promo" dan klik terapkan. Diskon Anda akan diterapkan.`;
         case "ur": return `اسٹور کی چیک آؤٹ صفحہ پر، کوڈ کو "پرومو کوڈ" باکس میں پیسٹ کریں اور اپلائی پر کلک کریں۔ آپ کا ڈسکاؤنٹ لاگو ہوجائے گا۔`;
         case "fa": return `در صفحه پرداخت فروشگاه ${name}، کد را در جعبه "کد تبلیغاتی" قرار دهید و روی اعمال کلیک کنید. تخفیف شما اعمال می شود.`;
         case "my": return `ကုဒ်ကို "ပရိုမိုးရှင်" လိပ်စာတွင် ထည့်ပါ၊ အသုံးပြုပါ။ သင်၏လျှောက်လွှာတွင် သင့်လျှောက်လွှာကို အသုံးပြုနိုင်ပါသည်။ `;
      }

   }else if

(type == "faq1Question"){

      switch(lang){
         case "en": return `Is there any Discount Offer and Code available for ${name} ?`;
         case "es": return `¿Hay alguna oferta de descuento y código disponible para ${name}?`;
         case "fr": return `Y a-t-il une offre de réduction et un code disponibles pour ${name} ?`;
         case "de": return `Gibt es ein Rabattangebot und einen Code für ${name} ?`;
         case "ru": return `Есть ли скидочное предложение и код для ${name} ?`;
         case "da": return `Er der nogen rabattilbud og kode tilgængelige for ${name} ?`;
         case "it": return `Esiste un'offerta di sconto e un codice disponibili per ${name} ?`;
         case "cs": return `Je k dispozici nějaká slevová nabídka a kód pro ${name} ?`;
         case "nl": return `Is er een korting en code beschikbaar voor ${name} ?`;
         case "no": return `Er det noen rabatttilbud og kode tilgjengelig for ${name} ?`;
         case "pl": return `Czy dostępna jest jakaś oferta rabatowa i kod dla ${name} ?`;
         case "sv": return `Finns det något rabatterbjudande och kod tillgängligt för ${name} ?`;
         case "tr": return `Herhangi bir İndirim Teklifi ve Kodu var mı ${name} ?`;
         case "uk": return `Чи є якась пропозиція зі знижкою та код для ${name} ?`;
         case "ro": return `Există vreo ofertă de reducere și un cod disponibil pentru ${name} ?`;
         case "bg": return `Има ли някаква оферта за отстъпка и код налична за ${name} ?`;
         case "be": return `Ці ёсць якаясь прапанова з узнагароджаннем і код для ${name} ?`;
         case "fi": return `Onko ${name} -yritykselle saatavilla alennustarjous ja koodi ?`;
         case "pt": return `Existe alguma oferta de desconto e código disponível para ${name} ?`;
         case "hr": return `Postoji li neka ponuda za popust i kod dostupna za ${name} ?`;
         case "sl": return `Ali je na voljo kakšna ponudba za popust in koda za ${name} ?`;
         case "el": return `Υπάρχει κάποια προσφορά έκπτωσης και κωδικός διαθέσιμη για ${name} ?`;
         case "hu": return `Van-e bármilyen kedvezmény és kód elérhető ${name} ?`;
         case "sk": return `Je k dispozícii nejaká zľavová ponuka a kód pre ${name} ?`;
         case "ga": return `An bhfuil aon tairiscint faoi mhíbhuntáiste agus cód ar bith ar fáil do ${name} ?`;
         case "ja": return `${name} には割引オファーとコードがありますか？`;
         case "zh-CN": return `${name} 有折扣优惠和代码吗？`;
         case "ko": return `${name} 에는 할인 혜택과 코드가 있습니까?`;
         case "ar": return `هل هناك أي عرض خصم وكود متاح لـ ${name} ؟`;
         case "my": return `Adakah sebarang Tawaran Diskaun dan Kod yang tersedia untuk ${name} ?`;
         case "th": return `มีข้อเสนอส่วนลดและรหัสใด ๆ ที่มีให้สำหรับ ${name} หรือไม่ ?`;
         case "vi": return `Có bất kỳ Ưu đãi Giảm giá và Mã nào có sẵn cho ${name} không ?`;
         case "tl": return `Mayroon bang Discount Offer at Code na available para sa ${name} ?`;
         case "id": return `Apakah ada Penawaran Diskon dan Kode yang tersedia untuk ${name} ?`;
         case "ur": return `${name} کے لیے کوئی ڈسکاؤنٹ آفر اور کوڈ دستیاب ہے؟`;
         case "fa": return `آیا هر گونه پیشنهاد تخفیف و کدی برای ${name} موجود است؟`;
         case "my": return `အသုံးပြုသည့် ${name} လျှောက်လွှာနှင့် ကုဒ်များရရှိနိုင်သလား ?`;

          }

   }else if

(type == "faq1Answer"){
      switch(lang){
         case "en": return `Yes. There are several Discount code available for ${name}. You can check them on the ${name} store page.`;
         case "es": return `Sí. Hay varios códigos de descuento disponibles para ${name}. Puedes comprobarlos en la página de la tienda ${name}.`;
         case "fr": return `Oui. Il existe plusieurs codes de réduction disponibles pour ${name}. Vous pouvez les vérifier sur la page du magasin ${name}.`;
         case "de": return `Ja. Es gibt mehrere Rabattcodes für ${name}. Sie können sie auf der ${name} Geschäftsseite überprüfen.`;
         case "ru": return `Да. Для ${name} доступно несколько кодов скидок. Вы можете проверить их на странице магазина ${name}.`;
         case "da": return `Ja. Der er flere rabatkoder tilgængelige for ${name}. Du kan tjekke dem på ${name} butikssiden.`;
         case "it": return `Sì. Ci sono diversi codici sconto disponibili per ${name}. Puoi controllarli sulla pagina del negozio ${name}.`;
         case "cs": return `Ano. Pro ${name} je k dispozici několik slevových kódů. Můžete je zkontrolovat na stránce obchodu ${name}.`;
         case "nl": return `Ja. Er zijn verschillende kortingscodes beschikbaar voor ${name}. U kunt ze controleren op de ${name} winkelpagina.`;
         case "no": return `Ja. Det er flere rabattkoder tilgjengelig for ${name}. Du kan sjekke dem på ${name} butikksiden.`;
         case "pl": return `Tak. Dostępne są różne kody rabatowe dla ${name}. Możesz je sprawdzić na stronie sklepu ${name}.`;
         case "sv": return `Ja. Det finns flera rabattkoder tillgängliga för ${name}. Du kan kontrollera dem på ${name} butikssidan.`;
         case "tr": return `Evet. ${name} için birkaç İndirim kodu mevcut. Onları ${name} mağaza sayfasında kontrol edebilirsiniz.`;
         case "uk": return `Так. Для ${name} доступно кілька кодів знижок. Ви можете перевірити їх на сторінці магазину ${name}.`;
         case "ro": return `Da. Există mai multe coduri de reducere disponibile pentru ${name}. Le puteți verifica pe pagina magazinului ${name}.`;
         case "bg": return `Да. Има няколко кода за отстъпка налични за ${name}. Можете да ги проверите на страницата на магазина ${name}.`;
         case "be": return `Так. Для ${name} даступна некалькіх кодаў зніжак. Вы можаце праверыць іх на старонцы магазіну ${name}.`;
         case "fi": return `Kyllä. ${name} -yritykselle on useita alennuskoodeja. Voit tarkistaa ne ${name} -kauppasivulta.`;
         case "pt": return `Sim. Existem vários códigos de desconto disponíveis para ${name}. Você pode verificá-los na página da loja ${name}.`;
         case "hr": return `Da. Za ${name} dostupno je nekoliko kodova za popust. Možete ih provjeriti na stranici trgovine ${name}.`;
         case "sl": return `Da. Za ${name} so na voljo različne kode za popust. Preverite jih na strani trgovine ${name}.`;
         case "el": return `Ναι. Υπάρχουν αρκετοί κωδικοί έκπτωσης διαθέσιμοι για ${name}. Μπορείτε να τους ελέγξετε στη σελίδα του καταστήματος ${name}.`;
         case "hu": return `Igen. Több kedvezménykód is elérhető ${name} számára. Ellenőrizheti őket a ${name} üzlet oldalán.`;
         case "sk": return `Áno. Pre ${name} je k dispozícii niekoľko zliav. Môžete ich skontrolovať na stránke obchodu ${name}.`;
         case "ga": return `Tá. Tá roinnt códanna faoi mhíbhuntáiste ar fáil do ${name}. Is féidir leat iad a sheiceáil ar leathanach an siopa ${name}.`;
         case "ja": return `はい。 ${name} にはいくつかの割引コードがあります。 ${name} のストアページで確認できます。`;
         case "zh-CN": return `是的。 ${name} 有几个折扣代码。 您可以在 ${name} 商店页面上检查它们。`;
         case "ko": return `네. ${name} 에는 여러 할인 코드가 있습니다. ${name} 상점 페이지에서 확인할 수 있습니다.`;
         case "ar": return `نعم. هناك العديد من أكواد الخصم المتاحة لـ ${name}. يمكنك التحقق منها على صفحة متجر ${name}.`;
         case "my": return `Ya. Terdapat beberapa Kod Diskaun yang tersedia untuk ${name}. Anda boleh menyemaknya di halaman kedai ${name}.`;
         case "th": return `ใช่ มีรหัสส่วนลดหลายรหัสสำหรับ ${name} คุณสามารถตรวจสอบได้ที่หน้าร้าน ${name} `;
         case "vi": return `Có. Có một số Mã giảm giá có sẵn cho ${name}. Bạn có thể kiểm tra chúng trên trang cửa hàng ${name}.`;
         case "tl": return `Oo. May ilang Discount code na available para sa ${name}. Maaari mong suriin ang mga ito sa pahina ng tindahan ${name}.`;
         case "id": return `Ya. Ada beberapa Kode Diskon yang tersedia untuk ${name}. Anda dapat memeriksanya di halaman toko ${name}.`;
         case "ur": return `ہاں۔ ${name} کے لیے کئی ڈسکاؤنٹ کوڈ دستیاب ہیں۔ آپ انہیں ${name} کی دکان کی صفحہ پر چیک کرسکتے ہیں۔`;
         case "fa": return `بله. برای ${name} چندین کد تخفیف موجود است. شما می توانید آنها را در صفحه فروشگاه ${name} بررسی کنید.`;
         case "my": return `ဟုတ်ကဲ့။ ${name} အတွက် ကုဒ်များသည် အခြားကုဒ်များဖြစ်သည်။ သင်သည် ${name} ဆိုဒ်စာမျက်နှာတွင် စစ်ဆေးနိုင်သည်။ `;
        
      }

   }else if

(type == "faq2Question"){
      switch(lang){
         case "en": return `How can i claim ${name}ers and discount codes ?`;
         case "es": return `¿Cómo puedo reclamar las ofertas y códigos de descuento de ${name} ?`;
         case "fr": return `Comment puis-je réclamer les offres et codes de réduction de ${name} ?`;
         case "de": return `Wie kann ich die Angebote und Rabattcodes von ${name} beanspruchen ?`;
         case "ru": return `Как я могу получить предложения и коды скидок от ${name} ?`;
         case "da": return `Hvordan kan jeg kræve ${name} tilbud og rabatkoder ?`;
         case "it": return `Come posso richiedere offerte e codici sconto di ${name} ?`;
         case "cs": return `Jak mohu uplatnit nabídky a slevové kódy od ${name} ?`;
         case "nl": return `Hoe kan ik ${name} aanbiedingen en kortingscodes claimen ?`;
         case "no": return `Hvordan kan jeg kreve ${name} tilbud og rabattkoder ?`;
         case "pl": return `Jak mogę skorzystać z ofert i kodów rabatowych ${name} ?`;
         case "sv": return `Hur kan jag hävda ${name} erbjudanden och rabattkoder ?`;
         case "tr": return `Nasıl ${name} tekliflerini ve indirim kodlarını talep edebilirim ?`;
         case "uk": return `Як я можу отримати пропозиції та коди знижок від ${name} ?`;
         case "ro": return `Cum pot revendica ofertele și codurile de reducere de la ${name} ?`;
         case "bg": return `Как мога да искам предложенията и кодовете за отстъпка на ${name} ?`;
         case "be": return `Як я магу атрымаць прапановы і коды зніжак ад ${name} ?`;
         case "fi": return `Kuinka voin vaatia ${name} tarjoukset ja alennuskoodit ?`;
         case "pt": return `Como posso reivindicar as ofertas e códigos de desconto de ${name} ?`;
         case "hr": return `Kako mogu tvrditi ponude i kodove za popust od ${name} ?`;
         case "sl": return `Kako lahko uveljavim ponudbe in kode za popust od ${name} ?`;
         case "el": return `Πώς μπορώ να ζητήσω τις προσφορές και τους κωδικούς έκπτωσης από το ${name} ?`;
         case "hu": return `Hogyan igényelhetem a ${name} ajánlatokat és kedvezménykódokat ?`;
         case "sk": return `Ako môžem uplatniť ponuky a zľavové kódy od ${name} ?`;
         case "ga": return `Conas is féidir liom tairiscintí agus códanna faoi mhíbhuntáiste a éileamh ó ${name} ?`;
         case "ja": return `${name} のオファーや割引コードをどのように請求できますか？`;
         case "zh-CN": return `我如何索取 ${name} 的优惠和折扣代码？`;
         case "ko": return `${name} 의 혜택과 할인 코드를 어떻게 요청할 수 있나요?`;
         case "ar": return `كيف يمكنني المطالبة بعروض وأكواد الخصم من ${name} ؟`;
         case "my": return `Bagaimana saya boleh menuntut tawaran dan kod diskaun ${name} ?`;
         case "th": return `ฉันจะเรียกร้องข้อเสนอและรหัสส่วนลดของ ${name} ได้อย่างไร ?`;
         case "vi": return `Làm thế nào tôi có thể yêu cầu các ưu đãi và mã giảm giá của ${name} ?`;
         case "tl": return `Paano ko maaaring kunin ang mga alok at mga code ng diskwento mula sa ${name} ?`;
         case "id": return `Bagaimana saya bisa klaim penawaran dan kode diskon ${name} ?`;
         case "ur": return `میں کس طرح ${name} کی پیشکش اور ڈسکاؤنٹ کوڈ کو دعوت دے سکتا ہوں؟`;
         case "fa": return `چگونه می توانم پیشنهادات و کدهای تخفیف ${name} را دریافت کنم؟`;
         case "my": return `ကျေးဇူးပြု၍ ${name} အတွက် လျှောက်လွှာနှင့် ကုဒ်များကို အတွက်ပြုပြင်နိုင်ပါသလား ?`;

      }

   }else if

(type == "faq2Answer"){

      switch(lang){
         case "en": return `Click on deal from this page and purchase through our link to get confirmed discount.`;
         case "es": return `Haga clic en la oferta de esta página y compre a través de nuestro enlace para obtener un descuento confirmado.`;
         case "fr": return `Cliquez sur l'offre de cette page et achetez via notre lien pour obtenir une réduction confirmée.`;
         case "de": return `Klicken Sie auf das Angebot auf dieser Seite und kaufen Sie über unseren Link, um einen bestätigten Rabatt zu erhalten.`;
         case "ru": return `Нажмите на предложение с этой страницы и совершите покупку через нашу ссылку, чтобы получить подтвержденную скидку.`;
         case "da": return `Klik på tilbudet fra denne side og køb via vores link for at få bekræftet rabat.`;
         case "it": return `Fai clic sull'offerta di questa pagina e acquista tramite il nostro link per ottenere uno sconto confermato.`;
         case "cs": return `Klikněte na nabídku z této stránky a nakupujte prostřednictvím našeho odkazu, abyste získali potvrzenou slevu.`;
         case "nl": return `Klik op de deal van deze pagina en koop via onze link om een bevestigde korting te krijgen.`;
         case "no": return `Klikk på tilbudet fra denne siden og kjøp via lenken vår for å få bekreftet rabatt.`;
         case "pl": return `Kliknij ofertę z tej strony i dokonaj zakupu przez nasz link, aby otrzymać potwierdzoną zniżkę.`;
         case "sv": return `Klicka på erbjudandet från den här sidan och köp via vår länk för att få bekräftad rabatt.`;
         case "tr": return `Bu sayfadaki teklife tıklayın ve onaylı indirim almak için bağlantımız aracılığıyla satın alın.`;
         case "uk": return `Клацніть на пропозицію з цієї сторінки та здійсніть покупку через наш посилання, щоб отримати підтверджену знижку.`;
         case "ro": return `Faceți clic pe oferta de pe această pagină și cumpărați prin linkul nostru pentru a obține o reducere confirmată.`;
         case "bg": return `Кликнете върху офертата от тази страница и закупете чрез нашия линк, за да получите потвърдена отстъпка.`;
         case "be": return `Націсніце на прапанову з гэтай старонкі і зрабіце пакупку праз нашу спасылку, каб атрымаць пацверджаную зніжку.`;
         case "fi": return `Napsauta tarjousta tältä sivulta ja osta linkkimme kautta saadaksesi vahvistetun alennuksen.`;
         case "pt": return `Clique na oferta desta página e compre através do nosso link para obter um desconto confirmado.`;
         case "hr": return `Kliknite na ponudu s ove stranice i kupujte putem naše veze kako biste dobili potvrđeni popust.`;
         case "sl": return `Kliknite na ponudbo s te strani in kupujte prek naše povezave, da dobite potrjeno popust.`;
         case "el": return `Κάντε κλικ στην προσφορά από αυτή τη σελίδα και αγοράστε μέσω του συνδέσμου μας για να λάβετε επιβεβαιωμένη έκπτωση.`;
         case "hu": return `Kattintson az ajánlatra ezen az oldalon, és vásároljon a mi linkünkön keresztül, hogy megerősített kedvezményt kapjon.`;
         case "sk": return `Kliknite na ponuku z tejto stránky a nakupujte cez náš odkaz, aby ste získali potvrdenú zľavu.`;
         case "ga": return `Cliceáil ar an tairiscint ón leathanach seo agus ceannaigh trí ár nasc chun an lascaine a dhearbhú.`;
         case "ja": return `このページの取引をクリックして、確認された割引を得るためにリンクを介して購入してください。`;
         case "zh-CN": return `点击此页面上的交易并通过我们的链接购买以获得确认的折扣。`;
         case "ko": return `이 페이지의 거래를 클릭하고 확인된 할인을 받으려면 링크를 통해 구매하십시오.`;
         case "ar": return `انقر على الصفقة من هذه الصفحة وقم بالشراء من خلال رابطنا للحصول على الخصم المؤكد.`;
         case "my": return `Klik pada tawaran dari halaman ini dan beli melalui pautan kami untuk mendapatkan diskaun yang disahkan.`;
         case "th": return `คลิกที่ดีลจากหน้านี้และซื้อผ่านลิงก์ของเราเพื่อรับส่วนลดที่ยืนยันแล้ว`;
         case "vi": return `Nhấp vào ưu đãi từ trang này và mua qua liên kết của chúng tôi để nhận được giảm giá được xác nhận.`;
         case "tl": return `I-click ang deal mula sa pahinang ito at bumili sa pamamagitan ng aming link upang makumpirma ang diskwento.`;
         case "id": return `Klik penawaran dari halaman ini dan beli melalui tautan kami untuk mendapatkan diskon yang dikonfirmasi.`;
         case "ur": return `اس صفحہ سے ڈیل پر کلک کریں اور ہمارے لنک کے ذریعے خریداری کریں تاکہ تصدیق شدہ ڈسکاؤنٹ ملے۔`;
         case "fa": return `بر روی معامله از این صفحه کلیک کرده و از طریق پیوند ما خرید کنید تا تخفیف تایید شده را دریافت کنید.`;
         case "my": return `ဤစျေးဝယ်ကိုယ်တိုင်ကျေးဇူးပြုပါ၊ ကျေးဇူးပြုပါ၊ အကြောင်းအရာကိုယ်တိုင်ကျေးဇူးပြုပါ။`;

      }

   }else if

(type == "faq3Question"){
      switch(lang){
         case "en": return `Does ${name} provide refund and exchange policy ?`;
         case "es": return `¿Ofrece ${name} política de reembolso e intercambio ?`;
         case "fr": return `Offre ${name} une politique de remboursement et d'échange ?`;
         case "de": return `Bietet ${name} eine Rückerstattungs- und Umtauschpolitik an ?`;
         case "ru": return `Предоставляет ли ${name} политику возврата и обмена ?`;
         case "da": return `Giver ${name} refusions- og byttepolitik ?`;
         case "it": return `Offre ${name} una politica di rimborso e scambio ?`;
         case "cs": return `Poskytuje ${name} politiku vrácení peněz a výměny ?`;
         case "nl": return `Biedt ${name} een restitutie- en omruilbeleid aan ?`;
         case "no": return `Gir ${name} refusjons- og byttepolitikk ?`;
         case "pl": return `Czy ${name} oferuje politykę zwrotu i wymiany ?`;
         case "sv": return `Ger ${name} återbetalnings- och utbytespolicy ?`;
         case "tr": return `${name} iade ve değişim politikası sağlar mı ?`;
         case "uk": return `Чи надає ${name} політику повернення та обміну ?`;
         case "ro": return `Oferă ${name} o politică de rambursare și schimb ?`;
         case "bg": return `Предоставя ли ${name} политика за връщане и обмен ?`;
         case "be": return `Ці прадастаўляе ${name} палітыку вяртання і абмену ?`;
         case "fi": return `Tarjoaako ${name} palautus- ja vaihtopolitiikkaa ?`;
         case "pt": return `Oferece ${name} política de reembolso e troca ?`;
         case "hr": return `Nudi li ${name} politiku povrata i zamjene ?`;
         case "sl": return `Ali ${name} ponuja politiko vračila in zamenjave ?`;
         case "el": return `Παρέχει το ${name} πολιτική επιστροφής και ανταλλαγής ;`;
         case "hu": return `Nyújt-e ${name} visszatérítési és cserepolitikát ?`;
         case "sk": return `Poskytuje ${name} politiku vrátenia a výmeny ?`;
         case "ga": return `An bhfuil ${name} polasaí aisíocaíochta agus malairte ar fáil ?`;
         case "ja": return `${name} は返金と交換ポリシーを提供していますか？`;
         case "zh-CN": return `${name} 提供退款和交换政策吗？`;
         case "ko": return `${name} 환불 및 교환 정책을 제공합니까 ?`;
         case "ar": return `هل تقدم ${name} سياسة استرداد الأموال والتبادل ؟`;
         case "my": return `Adakah ${name} menyediakan polisi pemulangan dan pertukaran ?`;
         case "th": return `มีนโยบายการคืนเงินและการแลกเปลี่ยนของ ${name} หรือไม่ ?`;
         case "vi": return `Có chính sách hoàn tiền và trao đổi của ${name} không ?`;
         case "tl": return `Nagbibigay ba ang ${name} ng patakaran sa refund at exchange ?`;
         case "id": return `Apakah ${name} memberikan kebijakan pengembalian dan pertukaran ?`;
         case "ur": return `${name} کیا واپسی اور تبادلہ پالیسی فراہم کرتا ہے ؟`;
         case "fa": return `آیا ${name} سیاست بازگشت و تبادل را ارائه می دهد ؟`;
         case "my": return `${name} ကိုင်အမြတ်နှင့်အကြောင်းအရာကိုင်ပြုပြင်နိုင်သလား ?`;
         
      }

   }else if

(type == "faq3Answer"){

      switch(lang){
         case "en": return `${name} may have provide exchange & refund within a certain period from the date of purchase. For more details, visit the product page.`;
         case "es": return `${name} puede haber proporcionado intercambio y reembolso dentro de un cierto período a partir de la fecha de compra. Para más detalles, visite la página del producto.`;
         case "fr": return `${name} peut avoir fourni un échange et un remboursement dans un certain délai à compter de la date d'achat. Pour plus de détails, visitez la page du produit.`;
         case "de": return `${name} kann innerhalb eines bestimmten Zeitraums ab dem Kaufdatum einen Umtausch und eine Rückerstattung vorgenommen haben. Besuchen Sie die Produktseite für weitere Details.`;
         case "ru": return `${name} может предоставить обмен и возврат в течение определенного периода с даты покупки. Для получения дополнительной информации посетите страницу продукта.`;
         case "da": return `${name} kan have leveret udveksling og refusion inden for en bestemt periode fra købsdatoen. For flere detaljer, besøg produktsiden.`;
         case "it": return `${name} potrebbe aver fornito scambio e rimborso entro un certo periodo dalla data di acquisto. Per ulteriori dettagli, visita la pagina del prodotto.`;
         case "cs": return `${name} mohl poskytnout výměnu a vrácení peněz v určitém období od data nákupu. Pro více informací navštivte stránku produktu.`;
         case "nl": return `${name} kan binnen een bepaalde periode na de aankoopdatum een uitwisseling en terugbetaling hebben geleverd. Voor meer details, bezoek de productpagina.`;
         case "no": return `${name} kan ha gitt utveksling og refusjon innen en viss periode fra kjøpsdatoen. For flere detaljer, besøk produktsiden.`;
         case "pl": return `${name} może zapewnić wymianę i zwrot w określonym okresie od daty zakupu. Aby uzyskać więcej informacji, odwiedź stronę produktu.`;
         case "sv": return `${name} kan ha gett utbyte och återbetalning inom en viss period från inköpsdatumet. För mer information, besök produktsidan.`;
         case "tr": return `${name}, satın alma tarihinden belirli bir süre içinde değişim ve iade sağlamış olabilir. Daha fazla bilgi için ürün sayfasını ziyaret edin.`;
         case "uk": return `Можливо, ${name} надав обмін та повернення протягом певного періоду з дати покупки. Для отримання додаткової інформації відвідайте сторінку продукту.`;
         case "ro": return `${name} ar putea oferi schimb și rambursare într-un anumit interval de timp de la data achiziției. Pentru mai multe detalii, vizitați pagina produsului.`;
         case "bg": return `${name} може да предостави обмен и връщане в определен период от датата на покупката. За повече информация посетете страницата на продукта.`;
         case "be": return `${name} можа быць прадастаўлены абмен і вяртанне ў пэўны перыяд з даты пакупкі. Для дадатковай інфармацыі наведайце старонку прадукту.`;
         case "fi": return `${name} voi tarjota vaihdon ja palautuksen tietyn ajanjakson kuluessa ostopäivästä. Lisätietoja saat tuotesivulta.`;
         case "pt": return `${name} pode ter fornecido troca e reembolso dentro de um certo período a partir da data de compra. Para mais detalhes, visite a página do produto.`;
         case "hr": return `${name} može pružiti zamjenu i povrat unutar određenog razdoblja od datuma kupnje. Za više detalja posjetite stranicu proizvoda.`;
         case "sl": return `${name} morda ponuja izmenjavo in vračilo v določenem obdobju od datuma nakupa. Za več podrobnosti obiščite stran izdelka.`;
         case "el": return `${name} μπορεί να παρείχε ανταλλαγή και επιστροφή εντός συγκεκριμένης περιόδου από την ημερομηνία αγοράς. Για περισσότερες λεπτομέρειες, επισκεφθείτε τη σελίδα του προϊόντος.`;
         case "hu": return `${name} biztosított csere és visszatérítési lehetőséget egy bizonyos időszakon belül a vásárlás dátumától. További részletekért látogasson el a termékoldalra.`;
         case "sk": return `${name} mohol poskytnúť výmenu a vrátenie peňazí v určitom období od dátumu nákupu. Pre viac informácií navštívte stránku produktu.`;
         case "ga": return `D'fhéadfadh ${name} athrú agus aisíoc a sholáthar laistigh de thréimhse áirithe ó dáta an cheannaigh. Chun tuilleadh eolais a fháil, tabhair cuairt ar leathanach an táirge.`;
         case "ja": return `${name} は購入日から一定期間内に交換と返金を提供しているかもしれません。詳細については製品ページをご覧ください。`;
         case "zh-CN": return `${name} 可能在购买日期后的一定时间内提供交换和退款。有关更多详细信息，请访问产品页面。`;
         case "ko": return `${name} 은 구매일로부터 일정 기간 이내에 교환 및 환불을 제공할 수 있습니다. 자세한 내용은 제품 페이지를 방문하십시오.`;
         case "ar": return `قد يكون ${name} قد قدم استبدال واسترداد خلال فترة معينة من تاريخ الشراء. لمزيد من التفاصيل ، قم بزيارة صفحة المنتج.`;
         case "my": return `${name} mungkin telah menyediakan pertukaran dan pemulangan dalam tempoh tertentu dari tarikh pembelian. Untuk maklumat lanjut, lawati halaman produk.`;
         case "th": return `${name} อาจจะมีการให้บริการแลกเปลี่ยนและคืนเงินภายในระยะเวลาหนึ่งตั้งแต่วันที่ซื้อ สำหรับรายละเอียดเพิ่มเติม กรุณาเข้าชมหน้าผลิตภัณฑ์`;
         case "vi": return `${name} có thể cung cấp trao đổi và hoàn tiền trong một khoảng thời gian nhất định từ ngày mua. Để biết thêm chi tiết, hãy truy cập trang sản phẩm.`;
         case "tl": return `Maaaring magbigay ang ${name} ng palitan at refund sa loob ng isang tiyak na panahon mula sa petsa ng pagbili. Para sa karagdagang detalye, bisitahin ang pahina ng produkto.`;
         case "id": return `${name} mungkin telah memberikan pertukaran dan pengembalian dalam jangka waktu tertentu sejak tanggal pembelian. Untuk informasi lebih lanjut, kunjungi halaman produk.`;
         case "ur": return `${name} ممکن ہے خرید کی تاریخ سے مخصوص مدت کے اندر تبادلہ اور واپسی فراہم کرے۔ مزید تفصیلات کے لیے ، مصنوعات کی صفحہ دیکھیں۔`;
         case "fa": return `ممکن است ${name} در یک بازه زمانی خاص از تاریخ خرید تبادله و بازپرداخت ارائه دهد. برای اطلاعات بیشتر ، صفحه محصول را ببینید.`;
         case "my": return `${name} သည်ဝယ်ယူရက်မှစတင်ခြင်းအတွင်းတစ်ခုအတွင်းအသုံးပြုနိုင်သည်။ ပစ္စည်းစာမျက်နှာကိုနှိပ်ပါ။`; 
         
      }

   }else if

(type == "faq4Question"){

      switch(lang){
         case "en": return `Does ${name}ers Black Friday or Super Sunday discounts ?`;
         case "es": return `¿Ofrece ${name} descuentos de Black Friday o Super Sunday ?`;
         case "fr": return `Propose-t-il des réductions du Black Friday ou du Super Sunday ?`;
         case "de": return `Bietet es Black Friday oder Super Sunday Rabatte an ?`;
         case "ru": return `Предлагает ли ${name} скидки на Черную пятницу или Супер воскресенье ?`;
         case "da": return `Tilbyder ${name} Black Friday eller Super Sunday rabatter ?`;
         case "it": return `Offre ${name} sconti del Black Friday o del Super Sunday ?`;
         case "cs": return `Nabízí ${name} slevy na Black Friday nebo Super Sunday ?`;
         case "nl": return `Biedt ${name} Black Friday of Super Sunday kortingen aan ?`;
         case "no": return `Tilbyr ${name} Black Friday eller Super Sunday rabatter ?`;
         case "pl": return `Czy ${name} oferuje zniżki Black Friday lub Super Sunday ?`;
         case "sv": return `Erbjuder ${name} Black Friday eller Super Sunday rabatter ?`;
         case "tr": return `${name} Black Friday veya Super Sunday indirimleri sunuyor mu ?`;
         case "uk": return `Чи надає ${name} знижки на Чорну п'ятницю або Супер неділю ?`;
         case "ro": return `Oferă ${name} reduceri de Black Friday sau Super Sunday ?`;
         case "bg": return `Предлага ли ${name} отстъпки за Черни петък или Супер неделя ?`;
         case "be": return `Ці прапануе ${name} зніжкі на Чорную пятніцу ці Супер нядзелю ?`;
         case "fi": return `Tarjoaako ${name} Black Friday tai Super Sunday alennuksia ?`;
         case "pt": return `Oferece ${name} descontos de Black Friday ou Super Sunday ?`;
         case "hr": return `Nudi li ${name} popuste Black Friday ili Super Sunday ?`;
         case "sl": return `Ali ${name} ponuja popuste za Black Friday ali Super Sunday ?`;
         case "el": return `Προσφέρει το ${name} εκπτώσεις Black Friday ή Super Sunday ;`;
         case "hu": return `Kínál-e ${name} Black Friday vagy Super Sunday kedvezményeket ?`;
         case "sk": return `Ponúka ${name} zľavy na Black Friday alebo Super Sunday ?`;
         case "ga": return `An ofraíonn ${name} lascainní Black Friday nó Super Sunday ?`;
         case "ja": return `${name} はブラックフライデーやスーパーサンデーの割引を提供していますか？`;
         case "zh-CN": return `${name} 提供黑色星期五或超级星期日折扣吗？`;
         case "ko": return `${name} 은 블랙 프라이데이 또는 슈퍼 일요일 할인을 제공합니까 ?`;
         case "ar": return `هل تقدم ${name} خصومات الجمعة السوداء أو الأحد الرائعة ؟`;
         case "my": return `Adakah ${name} menawarkan diskaun Black Friday atau Super Sunday ?`;
         case "th": return `มี ${name} ให้ส่วนลด Black Friday หรือ Super Sunday หรือไม่ ?`;
         case "vi": return `Có ${name} cung cấp giảm giá Black Friday hoặc Super Sunday không ?`;
         case "tl": return `Nag-aalok ba ang ${name} ng mga diskwento sa Black Friday o Super Sunday ?`;
         case "id": return `Apakah ${name} menawarkan diskon Black Friday atau Super Sunday ?`;
         case "ur": return `${name} کیا بلیک جمعہ یا سپر سنڈے ڈسکاؤنٹ فراہم کرتا ہے ؟`;
         case "fa": return `آیا ${name} تخفیفات بلک فرایدی یا سوپر سنڈے فراهم کرتا ہے ؟`;
         case "my": return `${name} ကိုင်သည် Black Friday သို့မဟုတ် Super Sunday လျှောက်လွှာများကိုင်ပြုပြင်နိုင်သလား ?`;
        
      }

   }else if

(type == "faq4Answer"){

      switch(lang){
         case "en":  return `${name} not appear to have any Black Friday or Super Sunday offers until now. But we are constantly checking for the sales.`;
         case "es":  return `Hasta ahora, ${name} no parece tener ofertas de Black Friday o Super Sunday. Pero estamos constantemente revisando las ventas.`;
         case "fr":  return `Jusqu'à présent, ${name} ne semble pas avoir d'offres du Black Friday ou du Super Sunday. Mais nous vérifions constamment les ventes.`;
         case "de":  return `Bis jetzt scheint ${name} keine Black Friday oder Super Sunday Angebote zu haben. Aber wir überprüfen ständig die Verkäufe.`;
         case "ru":  return `Пока ${name} не имеет предложений на Черную пятницу или Супер воскресенье. Но мы постоянно проверяем продажи.`;
         case "da":  return `${name} ser ikke ud til at have nogen Black Friday- eller Super Sunday-tilbud indtil nu. Men vi tjekker hele tiden efter salget.`
         case "it":  return `Fino ad ora, ${name} non sembra avere offerte del Black Friday o del Super Sunday. Ma controlliamo costantemente le vendite.`;
         case "cs":  return `Dosud se nezdá, že by ${name} měl nabídky Black Friday nebo Super Sunday. Ale neustále kontrolujeme prodeje.`;
         case "nl":  return `Tot nu toe lijkt ${name} geen Black Friday- of Super Sunday-aanbiedingen te hebben. Maar we controleren voortdurend de verkopen.`;
         case "no":  return `${name} ser ikke ut til å ha noen Black Friday- eller Super Sunday-tilbud før nå. Men vi sjekker hele tiden etter salget.`;
         case "pl":  return `Do tej pory ${name} nie wydaje się mieć żadnych ofert Black Friday lub Super Sunday. Ale stale sprawdzamy sprzedaż.`;
         case "sv":  return `${name} verkar inte ha några Black Friday- eller Super Sunday-erbjudanden förrän nu. Men vi kollar hela tiden efter försäljningen.`;
         case "tr":  return `${name} şimdiye kadar herhangi bir Black Friday veya Super Sunday teklifi sunmuyor gibi görünmüyor. Ancak satışları sürekli kontrol ediyoruz.`;
         case "uk":  return `До цього часу ${name} не має жодних пропозицій на Чорну п'ятницю або Супер неділю. Але ми постійно перевіряємо продажі.`;
         case "ro":  return `Până acum, ${name} nu pare să aibă nicio ofertă de Black Friday sau Super Sunday. Dar verificăm constant vânzările.`;
         case "bg":  return `До момента ${name} не изглежда да има никакви предложения за Черен петък или Супер неделя. Но постоянно проверяваме продажбите.`;
         case "be":  return `Да цяпер ${name} не мае ніякіх прапановаў на Чорную пятніцу ці Супер нядзелю. Але мы пастаянна правераем прадажы.`;
         case "fi":  return `Tähän mennessä ${name} ei näytä tarjoavan mitään Black Friday- tai Super Sunday -tarjouksia. Mutta tarkistamme jatkuvasti myyntiä.`;
         case "pt":  return `Até agora, ${name} não parece ter ofertas de Black Friday ou Super Sunday. Mas estamos constantemente verificando as vendas.`;
         case "hr":  return `Do sada, ${name} ne izgleda da ima bilo kakve ponude Black Friday ili Super Sunday. Ali stalno provjeravamo prodaju.`;
         case "sl":  return `Do sedaj ${name} ne kaže, da ima kakršne koli ponudbe Black Friday ali Super Sunday. Toda nenehno preverjamo prodajo.`;
         case "el":  return `Μέχρι στιγμής, το ${name} δεν φαίνεται να έχει καμία προσφορά Black Friday ή Super Sunday. Αλλά ελέγχουμε συνεχώς τις πωλήσεις.`;
         case "hu":  return `Eddig úgy tűnik, hogy ${name} nem kínál semmilyen Black Friday vagy Super Sunday ajánlatot. De folyamatosan ellenőrizzük az eladásokat.`;
         case "sk":  return `Zatiaľ sa nezdá, že by ${name} mal ponuky Black Friday alebo Super Sunday. Ale neustále kontrolujeme predaje.`;
         case "ga":  return `Go dtí seo, níl cosúil le ${name} aon tairiscintí Black Friday nó Super Sunday a bheith aige. Ach táimid ag faire go leanúnach ar an díolachán.`;
         case "ja":  return `これまでのところ、${name} はブラックフライデーやスーパーサンデーのオファーを提供していないようです。しかし、売上を常にチェックしています。`;
         case "zh-CN":  return `到目前为止，${name} 似乎没有任何黑色星期五或超级星期日的优惠。但我们一直在检查销售情况。`;
         case "ko":  return `지금까지 ${name} 은 블랙 프라이데이나 슈퍼 일요일 할인을 제공하지 않는 것으로 보입니다. 그러나 우리는 판매를 계속 확인하고 있습니다.`;
         case "ar":  return `حتى الآن ، لا يبدو أن ${name} لديه أي عروض ليوم الجمعة السوداء أو الأحد الرائع. ولكننا نتحقق باستمرار من المبيعات.`;
         case "my":  return `Sehingga kini, ${name} tidak kelihatan mempunyai sebarang tawaran Black Friday atau Super Sunday. Tetapi kami sentiasa memeriksa jualan.`;
         case "th":  return `จนถึงปัจจุบัน ${name} ไม่มีข้อเสนอ Black Friday หรือ Super Sunday ใด ๆ แต่เรากำลังตรวจสอบการขายอย่างต่อเนื่อง`;
         case "vi":  return `Đến nay, ${name} không có vẻ có bất kỳ ưu đãi Black Friday hoặc Super Sunday nào. Nhưng chúng tôi liên tục kiểm tra bán hàng.`;
         case "tl":  return `Sa ngayon, wala pang Black Friday o Super Sunday na alok ang ${name}. Ngunit patuloy naming sinusuri ang mga benta.`;
         case "id":  return `Hingga saat ini, ${name} tidak terlihat memiliki penawaran Black Friday atau Super Sunday. Tetapi kami terus memeriksa penjualan.`;
         case "ur":  return `اب تک ، ${name} کوئی بلیک جمعہ یا سپر سنڈے کی پیشکش نہیں کرتا۔ لیکن ہم مسلسل فروخت کی جانچ پڑتال کر رہے ہیں۔`;
         case "fa":  return `تا کنون ، به نظر نمی رسد ${name} هیچ پیشنهادی برای جمعه سیاه یا یکشنبه فوق العاده دارد. اما ما به طور مداوم فروش را بررسی می کنیم.`;
         case "my":  return `အကယ်၍ ${name} သည်မည်သည့်အချက်အလက်များကိုင်အမြတ်နှင့်အကြောင်းအရာများကိုင်ပြုပြင်နိုင်သလား ?`;

        
      }

   }

      

}







