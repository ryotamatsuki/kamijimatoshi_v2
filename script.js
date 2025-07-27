document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.nav');

    if (navToggle && nav) {
        navToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            navToggle.classList.toggle('active');
            const expanded = navToggle.classList.contains('active');
            navToggle.setAttribute('aria-expanded', expanded);
        });
    }

    // Smooth Scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Fade-in animation on scroll
    const fadeInElements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeInElements.forEach(el => {
        observer.observe(el);
    });

    // Tax Deduction Simulator
    const simulateBtn = document.getElementById('simulate-btn');
    if (simulateBtn) {
        simulateBtn.addEventListener('click', () => {
            const donationAmount = parseFloat(document.getElementById('donation-amount').value);
            const taxableIncome = parseFloat(document.getElementById('taxable-income').value);

            if (isNaN(donationAmount) || isNaN(taxableIncome) || donationAmount <= 0 || taxableIncome < 0) {
                alert('有効な寄附予定額と法人課税所得を入力してください。');
                return;
            }

            // 企業版ふるさと納税の税制優遇ロジック (簡易版)
            // 1. 損金算入: 寄附額の全額が損金算入されるため、法人税等の軽減効果がある
            //    法人実効税率を約30%と仮定
            const corporateTaxRate = 0.30;
            const deductionBenefit = donationAmount * corporateTaxRate;

            // 2. 税額控除: 寄附額の最大6割が税額控除される
            //    (法人住民税、法人事業税、法人税から控除)
            //    ただし、寄附額の1割は実質負担となるため、控除上限は寄附額の9割
            const taxCreditRate = 0.6; // 最大6割
            const maxTaxCredit = donationAmount * 0.9; // 実質1割負担のため、控除上限は9割
            const actualTaxCredit = Math.min(donationAmount * taxCreditRate, maxTaxCredit);

            const totalTaxReduction = deductionBenefit + actualTaxCredit;
            const companyBurden = donationAmount - totalTaxReduction;

            document.getElementById('tax-reduction-total').textContent = Math.round(totalTaxReduction).toLocaleString();
            document.getElementById('company-burden').textContent = Math.round(companyBurden).toLocaleString();
            document.getElementById('simulation-result').style.display = 'block';
        });
    }

    // Contact Form Validation
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent default form submission

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            const privacyPolicy = document.getElementById('privacy-policy').checked;

            if (!name || !email || !message) {
                alert('お名前、メールアドレス、お問い合わせ内容は必須項目です。');
                return;
            }

            if (!privacyPolicy) {
                alert('プライバシーポリシーへの同意が必要です。');
                return;
            }

            // Basic email format validation
            const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            if (!emailPattern.test(email)) {
                alert('有効なメールアドレスを入力してください。');
                return;
            }

            // If all validations pass, you can proceed with form submission (e.g., via Fetch API)
            alert('お問い合わせありがとうございます。内容を送信しました。');
            contactForm.reset(); // Clear the form
            document.getElementById('simulation-result').style.display = 'none'; // Hide simulator result
        });
    }

    // Custom Cursor (Optional, if you want to enable it)
    // const customCursor = document.querySelector('.custom-cursor');
    // if (customCursor) {
    //     document.addEventListener('mousemove', (e) => {
    //         customCursor.style.left = e.clientX + 'px';
    //         customCursor.style.top = e.clientY + 'px';
    //     });

    //     document.querySelectorAll('a, button, .theme-item, .kpi-item, .story-item').forEach(el => {
    //         el.addEventListener('mouseenter', () => {
    //             customCursor.classList.add('hover');
    //         });
    //         el.addEventListener('mouseleave', () => {
    //             customCursor.classList.remove('hover');
    //         });
    //     });
    // }

    // Dark Mode Toggle (Optional, if you want to enable it)
    // const darkModeToggle = document.getElementById('dark-mode-toggle');
    // if (darkModeToggle) {
    //     darkModeToggle.addEventListener('click', () => {
    //         document.body.classList.toggle('dark-mode');
    //         // You would also need to define .dark-mode styles in your CSS
    //     });
    // }
});
