        class LazyAdSense {
            constructor() {
                this.adsenseLoaded = false;
                this.observedAds = new Set();
                this.init();
            }

            init() {
                // Cek apakah browser mendukung Intersection Observer
                if (&#39;IntersectionObserver&#39; in window) {
                    this.setupIntersectionObserver();
                } else {
                    // Fallback untuk browser lama
                    this.loadAllAds();
                }
            }

            setupIntersectionObserver() {
                const options = {
                    root: null, // viewport
                    rootMargin: &#39;100px&#39;, // Load iklan 100px sebelum masuk viewport
                    threshold: 0.1 // Trigger ketika 10% elemen terlihat
                };

                this.observer = new IntersectionObserver((entries) =&gt; {
                    entries.forEach(entry =&gt; {
                        if (entry.isIntersecting &amp;&amp; !this.observedAds.has(entry.target)) {
                            this.loadAd(entry.target);
                            this.observedAds.add(entry.target);
                            this.observer.unobserve(entry.target);
                        }
                    });
                }, options);

                // Observe semua container iklan
                document.querySelectorAll(&#39;.ad-container&#39;).forEach(ad =&gt; {
                    this.observer.observe(ad);
                });
            }

            async loadAdSenseScript() {
                if (this.adsenseLoaded) return Promise.resolve();

                return new Promise((resolve, reject) =&gt; {
                    const script = document.createElement(&#39;script&#39;);
                    script.async = true;
                    script.src = &#39;https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js&#39;;
                    script.crossOrigin = &#39;anonymous&#39;;
                    
                    script.onload = () =&gt; {
                        this.adsenseLoaded = true;
                        resolve();
                    };
                    
                    script.onerror = () =&gt; {
                        reject(new Error(&#39;Gagal memuat script AdSense&#39;));
                    };

                    document.head.appendChild(script);
                });
            }

            async loadAd(container) {
                try {
                    // Update placeholder
                    const placeholder = container.querySelector(&#39;.ad-placeholder span&#39;);
                    if (placeholder) {
                        placeholder.textContent = &#39;Memuat iklan...&#39;;
                        placeholder.className = &#39;ad-loading&#39;;
                    }

                    // Load AdSense script jika belum dimuat
                    await this.loadAdSenseScript();

                    // Buat elemen iklan
                    const adElement = this.createAdElement(container);
                    
                    // Hapus placeholder dan tambahkan iklan
                    container.innerHTML = &#39;&#39;;
                    container.appendChild(adElement);

                    // Push iklan ke AdSense
                    if (window.adsbygoogle) {
                        (window.adsbygoogle = window.adsbygoogle || []).push({});
                    }

                    console.log(&#39;Iklan berhasil dimuat:&#39;, container.dataset.adSlot);

                } catch (error) {
                    console.error(&#39;Error memuat iklan:&#39;, error);
                    this.showErrorPlaceholder(container);
                }
            }

            createAdElement(container) {
                const ins = document.createElement(&#39;ins&#39;);
                ins.className = &#39;adsbygoogle&#39;;
                ins.style.display = &#39;block&#39;;
                ins.dataset.adClient = container.dataset.adClient;
                ins.dataset.adSlot = container.dataset.adSlot;
                
                if (container.dataset.adFormat) {
                    ins.dataset.adFormat = container.dataset.adFormat;
                }
                
                if (container.dataset.adFormat === &#39;auto&#39;) {
                    ins.dataset.fullWidthResponsive = &#39;true&#39;;
                }

                return ins;
            }

            showErrorPlaceholder(container) {
                container.innerHTML = `
                    <div class='ad-placeholder'>
                        <span style='color: #dc3545;'>Gagal memuat iklan</span>
                    </div>
                `;
            }

            loadAllAds() {
                // Fallback untuk browser yang tidak mendukung Intersection Observer
                document.querySelectorAll(&#39;.ad-container&#39;).forEach(ad =&gt; {
                    setTimeout(() =&gt; this.loadAd(ad), 1000);
                });
            }

            // Method untuk memuat iklan secara manual
            loadAdById(adSlot) {
                const container = document.querySelector(`[data-ad-slot=&quot;${adSlot}&quot;]`);
                if (container &amp;&amp; !this.observedAds.has(container)) {
                    this.loadAd(container);
                    this.observedAds.add(container);
                }
            }

            // Method untuk me-refresh iklan
            refreshAd(adSlot) {
                const container = document.querySelector(`[data-ad-slot=&quot;${adSlot}&quot;]`);
                if (container) {
                    this.observedAds.delete(container);
                    this.loadAd(container);
                }
            }
        }

        // Inisialisasi lazy loading ketika DOM siap
        document.addEventListener(&#39;DOMContentLoaded&#39;, () =&gt; {
            window.lazyAdSense = new LazyAdSense();
            
            // Contoh penggunaan manual loading (opsional)
            // setTimeout(() =&gt; {
            //     window.lazyAdSense.loadAdById(&#39;1234567890&#39;);
            // }, 3000);
        });

        // Event listener untuk debugging
        window.addEventListener(&#39;load&#39;, () =&gt; {
            console.log(&#39;Lazy AdSense initialized&#39;);
        });
