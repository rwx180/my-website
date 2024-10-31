document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // منع إعادة تحميل الصفحة
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // عرض رسالة تأكيد
        alert(`شكرًا لك، ${name}! لقد تم إرسال رسالتك بنجاح.`);
        
        // إعادة تعيين النموذج
        form.reset();
    });
});
