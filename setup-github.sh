#!/bin/bash
# suleymanalpar.com - GitHub Kurulum Scripti
# Bu scripti Terminal'de çalıştırın.

set -e

echo "🚀 GitHub repo kurulumu başlıyor..."

# Proje dizinine git
cd "$(dirname "$0")"

# Git repo başlat
git init -b main

# Dosyaları ekle
git add .gitignore README.md index.html patients.html students.html blog.html css/ js/ img/

# İlk commit
git commit -m "Initial commit: suleymanalpar.com web sitesi

Hasta bilgilendirme, öğrenci kaynakları, blog ve TR/EN dil desteği"

echo ""
echo "✅ Yerel git repo hazır!"
echo ""
echo "Şimdi GitHub'da repo oluşturun:"
echo "  1. https://github.com/new adresine gidin"
echo "  2. Repository name: suleymanalpar.com"
echo "  3. Public seçin"
echo "  4. 'Create repository' butonuna tıklayın"
echo ""
echo "Repo oluşturduktan sonra aşağıdaki komutu çalıştırın"
echo "(KULLANICI_ADINIZI kendi GitHub kullanıcı adınızla değiştirin):"
echo ""
echo "  git remote add origin https://github.com/KULLANICI_ADINIZI/suleymanalpar.com.git"
echo "  git push -u origin main"
echo ""
