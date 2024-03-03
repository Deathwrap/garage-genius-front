<template>
  <div class="contacts">
    <h2>Контакты</h2>
    <div class="contact-info">
      <p><strong>Номер телефона:</strong> {{ phoneNumber }}</p>
      <p><strong>Адрес:</strong> {{ address }}</p>
    </div>
    <div class="map">
      <iframe
          width="600"
          height="450"
          :src="mapUrl"
          style="border:0;"
          allowfullscreen=""
          loading="lazy"
      ></iframe>
    </div>
  </div>
</template>

<script>
export default {
  name: "ContactsView",
  data() {
    return {
      phoneNumber: "+7 (XXX) XXX-XX-XX", // Замените на ваш номер телефона
      address: "г. Козельск, улица Чкалова, 16", // Замените на ваш адрес
      mapUrl: "https://yandex.ru/map-widget/v1/?um=constructor%3Aae05b28ecf74efdde47f039610f0404a00b171e9cad64743e8978509f9f6224c&amp;source=constructor", // Замените на вашу ссылку на карту Яндекса
    };
  },
};
</script>

<style scoped>
.contacts {
  margin-top: 20px;
}

.contact-info {
  margin-bottom: 20px;
}

.map {
  width: 100%;
  height: 400px;
  margin-bottom: 20px;
}

iframe {
  width: 100%;
  height: 100%;
}
</style>
