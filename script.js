document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.nav');

    if (navToggle && nav) {
        navToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            const expanded = nav.classList.contains('active') ? 'true' : 'false';
            navToggle.setAttribute('aria-expanded', expanded);
        });
    }

    // Smooth scrolling for anchor links (if any)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Tax Deduction Simulator Logic
    const simulateBtn = document.getElementById('simulate-btn');
    if (simulateBtn) {
        simulateBtn.addEventListener('click', () => {
            const donationAmountInput = document.getElementById('donation-amount');
            const taxableIncomeInput = document.getElementById('taxable-income');
            const simulationResultDiv = document.getElementById('simulation-result');
            const taxReductionTotalSpan = document.getElementById('tax-reduction-total');
            const companyBurdenSpan = document.getElementById('company-burden');

            const donationAmount = parseFloat(donationAmountInput.value);
            const taxableIncome = parseFloat(taxableIncomeInput.value);

            if (isNaN(donationAmount) || donationAmount < 100000) {
                alert('寄附予定額は10万円以上の数値を入力してください。');
                return;
            }
            if (isNaN(taxableIncome) || taxableIncome < 0) {
                alert('法人課税所得は0以上の数値を入力してください。');
                return;
            }

            // Simplified calculation based on "実質1割負担" (effective 10% burden)
            const taxReductionTotal = donationAmount * 0.9;
            const companyBurden = donationAmount * 0.1;

            taxReductionTotalSpan.textContent = taxReductionTotal.toLocaleString();
            companyBurdenSpan.textContent = companyBurden.toLocaleString();
            simulationResultDiv.style.display = 'block';
        });
    }

    // Contact Form Validation Logic
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            let isValid = true;

            // Validate Name
            const nameInput = document.getElementById('name');
            if (nameInput.value.trim() === '') {
                alert('お名前は必須項目です。');
                isValid = false;
            }

            // Validate Email
            const emailInput = document.getElementById('email');
            const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            if (emailInput.value.trim() === '') {
                alert('メールアドレスは必須項目です。');
                isValid = false;
            } else if (!emailPattern.test(emailInput.value)) {
                alert('有効なメールアドレスを入力してください。');
                isValid = false;
            }

            // Validate Message
            const messageInput = document.getElementById('message');
            if (messageInput.value.trim() === '') {
                alert('お問い合わせ内容は必須項目です。');
                isValid = false;
            }

            // Validate Privacy Policy Checkbox
            const privacyPolicyCheckbox = document.getElementById('privacy-policy');
            if (!privacyPolicyCheckbox.checked) {
                alert('プライバシーポリシーへの同意が必要です。');
                isValid = false;
            }

            if (isValid) {
                // If all validations pass, you can submit the form or send data via AJAX
                alert('お問い合わせを送信しました。ありがとうございます！');
                contactForm.reset(); // Clear the form
                // In a real application, you would send this data to a server
            }
        });
    }
});
