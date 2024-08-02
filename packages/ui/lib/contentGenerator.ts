import { Lang } from "../types";
//@ts-ignore
import { words } from "../constants/words";
import dotenv from "dotenv";
// type: string,
//   name: string,
//   lang: Lang,
//   offer?: string,
//   offersList?: string,
//   couponCount?: number,
//   offerCount?: any,
//   count?: any,

export const contentGenerator = (obj: any) => {
  const {
    type,
    name,
    offer = "",
    couponCount = "",
    offerCount = "",
    count = "",
    percentage = "",
  } = obj;

  const lang = process.env.NEXT_PUBLIC_LG as Lang;
  const country = process.env.NEXT_PUBLIC_COUNTRYCODE as string;
  const countryName = process.env.NEXT_PUBLIC_COUNTRY as string;
  const cdnUrl = process.env.NEXT_PUBLIC_CDN_URL as string;

  const date = new Date();
  const monthRaw = date.toLocaleString("default", { month: "long" });
  //@ts-ignore
  const month = words[monthRaw][lang];
  const year = new Date().getFullYear();
  // todo: make it meaningful
  if (type == "seoTitle") {
    switch (lang) {
      case "en":
        return `${name} Promo Codes, Coupons & ${percentage} Discount | ${offerCount} ${offerCount && `+ Offers`} ${month} ${year} - ${process.env.NEXT_PUBLIC_APP}`;
      case "ru":
        return `${name} Промокоды, Купоны и ${percentage} Скидка | ${offerCount} ${offerCount && `+ Предложения`} ${month} ${year} - ${process.env.NEXT_PUBLIC_APP}`;
      case "ar":
        return `${name} أكواد القسائم، القسائم و ${percentage} خصم | ${offerCount} ${offerCount && `+ عروض`} ${month} ${year} - ${process.env.NEXT_PUBLIC_APP}`;
      case "pt":
        return `${name} Códigos promocionais, cupons e ${percentage} de desconto | ${offerCount} ${offerCount && `+ Ofertas`} ${month} ${year} - ${process.env.NEXT_PUBLIC_APP}`;
      case "ja":
        return `${name} プロモーションコード、クーポン、${percentage} 割引 | ${offerCount} ${offerCount && `+ オファー`} ${month} ${year} - ${process.env.NEXT_PUBLIC_APP}`;
    }
  } else if (
    // todo: make it meaningful

    type == "seoDescription"
  ) {
    switch (lang) {
      case "en":
        return `${couponCount}+ coupons ${offerCount && "and"} ${offerCount} offers. Get the latest, trending and hottest ${name} promo codes ${month} ${year}.`;
      case "ru":
        return `${couponCount}+ купонов ${offerCount && "и"} ${offerCount} предложений. Получите последние, трендовые и самые горячие промокоды ${name} ${month} ${year}.`;
      case "ar":
        return `${couponCount}+ قسيمة ${offerCount && "و"} ${offerCount} عرض. احصل على أحدث وأكثر الرموز الترويجية للاتجاهات والساخنة ${name} ${month} ${year}.`;
      case "pt":
        return `${couponCount}+ cupons ${offerCount && "e"} ${offerCount} ofertas. Obtenha os códigos promocionais mais recentes, em alta e mais quentes ${name} ${month} ${year}.`;
      case "ja":
        return `${couponCount}+ クーポン ${offerCount && "および"} ${offerCount} オファー。最新でトレンドのある ${name} プロモーションコード ${month} ${year}。`;
    }
  } else if (type == "homeTitle") {
    switch (lang) {
      case "en":
        return `Hottest Offers, Discount & Promo Codes | ${month} ${year}`;
      case "ru":
        return `Самые горячие предложения, скидки и промокоды | ${month} ${year}`;
      case "ar":
        return `أحدث العروض والخصومات وأكواد القسائم | ${month} ${year}`;
      case "pt":
        return `Ofertas, descontos e códigos promocionais mais quentes | ${month} ${year}`;
      case "ja":
        return `最新のオファー、割引、プロモーションコード | ${month} ${year}`;
    }
  } else if (type == "homeDescription") {
    switch (lang) {
      case "en":
        return `${process.env.NEXT_PUBLIC_APP} have latest and hottest offers, discounts and promo codes for your favorite stores. Get the best deals and save big on your orders.`;
      case "ru":
        return `${process.env.NEXT_PUBLIC_APP} имеет последние и самые горячие предложения, скидки и промокоды для ваших любимых магазинов. Получите лучшие предложения и сэкономьте крупные суммы на своих заказах.`;
      case "ar":
        return `تحتوي ${process.env.NEXT_PUBLIC_APP} على أحدث وأكثر العروض والخصومات وأكواد القسائم شهرة لمتاجرك المفضلة. احصل على أفضل الصفقات ووفر كبيرًا على طلباتك.`;
      case "pt":
        return `${process.env.NEXT_PUBLIC_APP} tem ofertas, descontos e códigos promocionais mais recentes e mais quentes para suas lojas favoritas. Obtenha as melhores ofertas e economize muito em seus pedidos.`;
      case "ja":
        return `${process.env.NEXT_PUBLIC_APP} はお気に入りのストアの最新で最も人気のあるオファー、割引、プロモーションコードを提供しています。最高の取引をして注文を大幅に節約してください。`;
    }
    //------------------- Hottest COupons -------------
  } else if (type == "hottestCouponsHeading") {
    switch (lang) {
      case "en":
        return `Hottest ${name} Coupons & Promo Codes | ${month} ${year}`;
      case "ru":
        return `Самые горячие купоны и скидки ${name} | ${month} ${year}`;
      case "ar":
        return `أكواد القسائم الأكثر شهرة ${name} | ${month} ${year}`;
      case "pt":
        return `Cupons e códigos promocionais mais quentes de ${name} | ${month} ${year}`;
      case "ja":
        return `最も人気のある ${name} クーポンとプロモーションコード | ${month} ${year}`;
    }
    //---------------- Latest Coupons Heading ----------------//
  } else if (type == "latestCouponsHeading") {
    switch (lang) {
      case "en":
        return `Latest ${name} Coupon & Promo Codes | ${month} ${year}`;
      case "ru":
        return `Последние купоны и промокоды ${name} | ${month} ${year}`;
      case "ar":
        return `أحدث أكواد القسائم ${name} | ${month} ${year}`;
      case "pt":
        return `Últimos cupons e códigos promocionais de ${name} | ${month} ${year}`;
      case "ja":
        return `最新の ${name} クーポンとプロモーションコード | ${month} ${year}`;
    }
    //---------------- Trending Coupons Heading ----------------//
  } else if (type == "trendingCouponsHeading") {
    switch (lang) {
      case "en":
        return `Trending ${name} Coupon & Promo Codes | ${month} ${year}`;
      case "ru":
        return `Трендовые купоны и промокоды ${name} | ${month} ${year}`;
      case "ar":
        return `أكواد القسائم الشائعة ${name} | ${month} ${year}`;
      case "pt":
        return `Cupons e códigos promocionais em tendência de ${name} | ${month} ${year}`;
      case "ja":
        return `トレンドの ${name} クーポンとプロモーションコード | ${month} ${year}`;
    }
  } else if (
    //---------------- hottest Offers ----------------//
    type == "hottestOffersHeading"
  ) {
    switch (lang) {
      case "en":
        return `Hottest ${name} Offers & Deals | ${month} ${year}`;
      case "ru":
        return `Самые горячие предложения и сделки ${name} | ${month} ${year}`;
      case "ar":
        return `أفضل عروض ${name} | ${month} ${year}`;
      case "pt":
        return `Ofertas e promoções mais quentes de ${name} | ${month} ${year}`;
      case "ja":
        return `最も人気のある ${name} オファーとディール | ${month} ${year}`;
    }
  } else if (
    //---------------- latest Offers ----------------//
    type == "latestOffersHeading"
  ) {
    switch (lang) {
      case "en":
        return `Latest ${name} Offers & Deals | ${month} ${year}`;
      case "ru":
        return `Последние предложения и сделки ${name} | ${month} ${year}`;
      case "ar":
        return `أحدث عروض ${name} | ${month} ${year}`;
      case "pt":
        return `Últimas ofertas e promoções de ${name} | ${month} ${year}`;
      case "ja":
        return `最新の ${name} オファーとディール | ${month} ${year}`;
    }
  } else if (
    //---------------- Trending Offers ----------------//
    type == "trendingOffersHeading"
  ) {
    switch (lang) {
      case "en":
        return `Trending ${name} Offers & Deals | ${month} ${year}`;
      case "ru":
        return `Трендовые предложения и сделки ${name} | ${month} ${year}`;
      case "ar":
        return `أفضل عروض ${name} | ${month} ${year}`;
      case "pt":
        return `Ofertas e promoções em tendência de ${name} | ${month} ${year}`;
      case "ja":
        return `トレンドの ${name} オファーとディール | ${month} ${year}`;
    }
  } else if (
    //---------------- Store Page Heading ----------------//
    //TODO: make it natural
    type == "storePageHeading"
  ) {
    switch (lang) {
      case "en":
        return `${name} Coupons & Promo Codes | Verified ${month} ${year}`;
      case "ru":
        return `Купоны и промокоды ${name} | Проверено ${month} ${year}`;
      case "ar":
        return `أكواد القسائم والترويجية ${name} | تم التحقق منها ${month} ${year}`;
      case "pt":
        return `Cupons e códigos promocionais de ${name} | Verificado ${month} ${year}`;
      case "ja":
        return `${name} クーポンとプロモーションコード | 確認済み ${month} ${year}`;
    }
  } else if (
    //---------------- About Heading ----------------//

    type == "aboutHeading"
  ) {
    switch (lang) {
      case "en":
        return `About ${name}`;
      case "ru":
        return `О ${name}`;
      case "ar":
        return `حول ${name}`;
      case "pt":
        return `Sobre ${name}`;
      case "ja":
        return `${name} について`;
    }
  } else if (
    //---------------- About Content ----------------//

    type == "aboutContent"
  ) {
    switch (lang) {
      case "en":
        return `${name} is offering ${couponCount || 1} coupons ${offerCount && "and"} ${offerCount} ${offerCount && "Offers"} today. Shoppers can save up to ${offer} on their orders. All Offers and promo codes are updated to ${month} ${year}`;
      case "ru":
        return `${name} предлагает ${couponCount || 1} купонов ${offerCount && "и"} ${offerCount} ${offerCount && "предложения"} сегодня. Покупатели могут сэкономить до ${offer} на своих заказах. Все предложения и промокоды обновляются до ${month} ${year}`;
      case "ar":
        return `تقدم ${name} ${couponCount || 1} قسيمة ${offerCount && "و"} ${offerCount} ${offerCount && "عروض"} اليوم. يمكن للمتسوقين توفير ما يصل إلى ${offer} على طلباتهم. تم تحديث جميع العروض وأكواد الخصم حتى ${month} ${year}`;
      case "pt":
        return `${name} está oferecendo ${couponCount || 1} cupons ${offerCount && "e"} ${offerCount} ${offerCount && "Ofertas"} hoje. Os compradores podem economizar até ${offer} em seus pedidos. Todas as ofertas e códigos promocionais são atualizados para ${month} ${year}`;
      case "ja":
        return `${name} は今日 ${couponCount || 1} クーポン ${offerCount && "および"} ${offerCount} ${offerCount && "オファー"} を提供しています。ショッパーは注文時に最大 ${offer} 節約できます。すべてのオファーとプロモーションコードは ${month} ${year} までに更新されています`;
    }
  } else if (
    //---------------- FAQ Heading ----------------//

    type == "faqHeading"
  ) {
    switch (lang) {
      case "en":
        return `${name} Frequently Asked Questions`;
      case "ru":
        return `Часто задаваемые вопросы о ${name}`;
      case "ar":
        return `أسئلة مكررة حول ${name}`;
      case "pt":
        return `Perguntas frequentes sobre ${name}`;
      case "ja":
        return `${name} よくある質問`;
    }
  } else if (
    //---------------- Similar Stores ----------------//

    type == "similarStoresHeading"
  ) {
    switch (lang) {
      case "en":
        return `${name} Similar Stores`;
      case "ru":
        return `Похожие магазины ${name}`;
      case "ar":
        return `متاجر مماثلة ${name}`;
      case "pt":
        return `Lojas semelhantes a ${name}`;
      case "ja":
        return `${name} 類似のストア`;
    }
  } else if (
    //---------------- offerStatsHeading ----------------//

    type == "offerStatsHeading"
  ) {
    switch (lang) {
      case "en":
        return `${name} Stats`;
      case "ru":
        return `Статистика ${name}`;
      case "ar":
        return `إحصائيات ${name}`;
      case "pt":
        return `Estatísticas de ${name}`;
      case "ja":
        return `${name} 統計`;
    }
  } else if (type == "howToApplyHeading") {
    switch (lang) {
      case "en":
        return `How to apply ${name} Coupon Codes ?`;
      case "ru":
        return `Как применить купоны ${name} ?`;
      case "ar":
        return `كيفية تطبيق أكواد القسائم ${name} ?`;
      case "pt":
        return `Como aplicar códigos de cupom ${name} ?`;
      case "ja":
        return `${name} クーポンコードの適用方法 ?`;
    }
  } else if (type == "howToApplyStep1") {
    switch (lang) {
      case "en":
        return `Select a useful ${name} Promo Codes and click "Show Code" or "View Deal" button. A Popup will appear with Code, Link and Extra Information.`;
      case "ru":
        return `Выберите полезные промокоды ${name} и нажмите кнопку "Показать код" или "Просмотреть сделку". Появится всплывающее окно с кодом, ссылкой и дополнительной информацией.`;
      case "ar":
        return `حدد أكواد القسائم الفعالة ${name} وانقر على الزر "إظهار الكود" أو "عرض الصفقة". سيظهر نافذة منبثقة مع الرمز والرابط والمعلومات الإضافية.`;
      case "pt":
        return `Selecione códigos promocionais úteis de ${name} e clique no botão "Mostrar código" ou "Ver oferta". Aparecerá um pop-up com código, link e informações extras.`;
      case "ja":
        return `有用な ${name} プロモーションコードを選択し、「コードを表示」または「取引を表示」ボタンをクリックします。ポップアップがコード、リンク、追加情報で表示されます。`;
    }
  } else if (type == "howToApplyStep2") {
    switch (lang) {
      case "en":
        return `Copy the code and click on "Go to Store". You can also view vote history by previous users.`;
      case "ru":
        return `Скопируйте код и нажмите "Перейти в магазин". Вы также можете просмотреть историю голосования предыдущих пользователей.`;
      case "ar":
        return `انسخ الرمز وانقر على "انتقل إلى المتجر". يمكنك أيضًا عرض تاريخ التصويت من قبل المستخدمين السابقين.`;
      case "pt":
        return `Copie o código e clique em "Ir para a loja". Você também pode visualizar o histórico de votação dos usuários anteriores.`;
      case "ja":
        return `コードをコピーして「ストアに移動」をクリックします。以前のユーザーによる投票履歴も表示できます。`;
    }
  } else if (type == "howToApplyStep3") {
    switch (lang) {
      case "en":
        return `On checkout page of ${name} store, paste the code in the "Promo Code" box and click apply. Your discount will be applied.`;
      case "ru":
        return `На странице оформления заказа магазина ${name} вставьте код в поле "Промокод" и нажмите применить. Ваша скидка будет применена.`;
      case "ar":
        return `على صفحة الخروج من متجر ${name} ، الصق الرمز في مربع "كود العرض" وانقر فوق تطبيق. سيتم تطبيق الخصم الخاص بك.`;
      case "pt":
        return `Na página de checkout da loja ${name}, cole o código na caixa "Código promocional" e clique em aplicar. Seu desconto será aplicado.`;
      case "ja":
        return `${name} ストアのチェックアウトページで、コードを「プロモーションコード」ボックスに貼り付けて適用をクリックします。割引が適用されます。`;
    }
  } else if (type == "faq1Question") {
    switch (lang) {
      case "en":
        return `Is there any Discount Offer and Code available for ${name} ?`;
      case "ru":
        return `Доступно ли какое-либо предложение о скидке и код для ${name} ?`;
      case "ar":
        return `هل هناك أي عرض خصم وكود متاح لـ ${name} ?`;
      case "pt":
        return `Existe alguma oferta de desconto e código disponível para ${name} ?`;
      case "ja":
        return `${name} に利用可能な割引オファーとコードはありますか？`;
    }
  } else if (type == "faq1Answer") {
    switch (lang) {
      case "en":
        return `Yes. There are several Discount code available for ${name}. You can check them on the ${name} store page.`;
      case "ru":
        return `Да. Для ${name} доступно несколько кодов скидок. Вы можете проверить их на странице магазина ${name}.`;
      case "ar":
        return `نعم. هناك العديد من أكواد الخصم المتاحة لـ ${name}. يمكنك التحقق منها على صفحة متجر ${name}.`;
      case "pt":
        return `Sim. Existem vários códigos de desconto disponíveis para ${name}. Você pode verificá-los na página da loja ${name}.`;
      case "ja":
        return `はい。 ${name} にはいくつかの割引コードがあります。 ${name} ストアページで確認できます。`;
    }
  } else if (type == "faq2Question") {
    switch (lang) {
      case "en":
        return `How can i claim ${name}ers and discount codes ?`;
      case "ru":
        return `Как я могу получить скидки и коды ${name} ?`;
      case "ar":
        return `كيف يمكنني المطالبة بـ ${name}ers وأكواد الخصم ؟`;
      case "pt":
        return `Como posso reivindicar ${name}ers e códigos de desconto ?`;
      case "ja":
        return `${name}ers と割引コードをどのように請求できますか？`;
    }
  } else if (type == "faq2Answer") {
    switch (lang) {
      case "en":
        return `Click on deal from this page and purchase through our link to get confirmed discount.`;
      case "ru":
        return `Нажмите на предложение с этой страницы и совершите покупку по нашей ссылке, чтобы получить подтвержденную скидку.`;
      case "ar":
        return `انقر على الصفقة من هذه الصفحة وقم بالشراء من خلال رابطنا للحصول على الخصم المؤكد.`;
      case "pt":
        return `Clique na oferta desta página e compre através do nosso link para obter o desconto confirmado.`;
      case "ja":
        return `このページの取引をクリックして、リンクを介して購入して確認された割引を受け取ります。`;
    }
  } else if (type == "faq3Question") {
    switch (lang) {
      case "en":
        return `Does ${name} provide refund and exchange policy ?`;
      case "ru":
        return `Предоставляет ли ${name} политику возврата и обмена ?`;
      case "ar":
        return `هل يقدم ${name} سياسة استرداد الأموال والتبادل ؟`;
      case "pt":
        return `O ${name} oferece política de reembolso e troca ?`;
      case "ja":
        return `${name} は返金と交換ポリシーを提供していますか？`;
    }
  } else if (type == "faq3Answer") {
    switch (lang) {
      case "en":
        return `${name} may have provide exchange & refund within a certain period from the date of purchase. For more details, visit the product page.`;
      case "ru":
        return `${name} может предоставить обмен и возврат в течение определенного периода с даты покупки. Для получения дополнительной информации посетите страницу продукта.`;
      case "ar":
        return `قد يقدم ${name} استبدال واسترداد خلال فترة معينة من تاريخ الشراء. لمزيد من التفاصيل ، قم بزيارة صفحة المنتج.`;
      case "pt":
        return `${name} pode ter fornecido troca e reembolso dentro de um determinado período a partir da data da compra. Para mais detalhes, visite a página do produto.`;
      case "ja":
        return `${name} は購入日から一定期間内に交換と返金を提供している場合があります。詳細については、製品ページをご覧ください。`;
    }
  } else if (type == "faq4Question") {
    switch (lang) {
      case "en":
        return `Does ${name}ers Black Friday or Super Sunday discounts ?`;
      case "ru":
        return `Предоставляет ли ${name} скидки на Черную пятницу или Супер воскресенье ?`;
      case "ar":
        return `هل يقدم ${name} خصومات الجمعة السوداء أو الأحد الرائعة ؟`;
      case "pt":
        return `O ${name} oferece descontos na Black Friday ou no Super Sunday ?`;
      case "ja":
        return `${name} はブラックフライデーやスーパーサンデーの割引を提供していますか？`;
    }
  } else if (type == "faq4Answer") {
    switch (lang) {
      case "en":
        return `${name} not appear to have any Black Friday or Super Sunday offers until now. But we are constantly checking for the sales.`;
      case "ru":
        return `Похоже, что у ${name} пока нет предложений на Черную пятницу или Супер воскресенье. Но мы постоянно проверяем продажи.`;
      case "ar":
        return `لا يبدو أن ${name} لديه أي عروض للجمعة السوداء أو الأحد الرائع حتى الآن. ولكننا نقوم بفحص المبيعات باستمرار.`;
      case "pt":
        return `O ${name} não parece ter nenhuma oferta de Black Friday ou Super Sunday até agora. Mas estamos constantemente verificando as vendas.`;
      case "ja":
        return `${name} は今のところブラックフライデーやスーパーサンデーのオファーはありません。しかし、常にセールをチェックしています。`;
    }
  }
};
