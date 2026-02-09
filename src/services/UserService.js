// services/UserService.js - VERSION ALLEMANDE
// ⚡ Changez DATA_VERSION chaque fois que vous modifiez getDefaultUsers()

const DEV_MODE = true;
const STORAGE_KEY = 'deutsche_bank_users_data';
const DATA_VERSION = 9; // ⚡ INCRÉMENTER CE NUMÉRO À CHAQUE MODIFICATION

class UserService {
  constructor() {
    if (DEV_MODE) console.log('🔧 UserService initialisé - Version', DATA_VERSION);
    this.loadFromStorage();
    this.managers = [
      'Hans Müller',
      'Sophie Schmidt', 
      'Peter Wagner',
      'Marie Fischer',
      'Thomas Becker',
      'Clara Hoffmann',
      'Markus Weber',
      'Anna Schulz'
    ];
  }

  loadFromStorage() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const storedVersion = localStorage.getItem(STORAGE_KEY + '_version');
      
      // ⚡ Vérifier la version - Si différente, réinitialiser automatiquement
      if (stored && storedVersion === String(DATA_VERSION)) {
        this.users = JSON.parse(stored);
        if (DEV_MODE) console.log('📦 Geladen aus localStorage:', this.users.length, 'Benutzer');
      } else {
        if (storedVersion && storedVersion !== String(DATA_VERSION)) {
          if (DEV_MODE) console.log('🔄 Neue Version erkannt (' + storedVersion + ' → ' + DATA_VERSION + '), Zurücksetzen...');
        } else {
          if (DEV_MODE) console.log('🆕 Erste Initialisierung');
        }
        this.users = this.getDefaultUsers();
        this.saveToStorage();
      }
    } catch (error) {
      if (DEV_MODE) console.error('❌ Fehler beim Laden:', error);
      this.users = this.getDefaultUsers();
      this.saveToStorage();
    }
  }

  saveToStorage() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.users));
      localStorage.setItem(STORAGE_KEY + '_version', String(DATA_VERSION));
      if (DEV_MODE) console.log('💾 Gespeichert (Version ' + DATA_VERSION + ')');
    } catch (error) {
      if (DEV_MODE) console.error('❌ Fehler beim Speichern:', error);
    }
  }

  resetToDefault() {
    if (DEV_MODE) console.log('🔄 Manuelle Datenrücksetzung');
    this.users = this.getDefaultUsers();
    this.saveToStorage();
  }

  // 🎯 Helper pour créer une transaction
  createTransaction(id, type, date, reference, amount, isCredit) {
    return {
      id,
      type,
      date,
      reference,
      amount,
      isCredit
    };
  }

  // 🎯 Helper pour créer une carte
  createCard(id, type, cardNumber, cvv, expiryDate, cardHolder, status = 'active') {
    return {
      id,
      type,
      cardNumber,
      maskedNumber: `${cardNumber.substring(0, 4)} **** **** ${cardNumber.slice(-4)}`,
      cvv,
      expiryDate,
      status,
      dailyWithdrawalLimit: 500,
      weeklyPaymentLimit: 2000,
      internationalPaymentEnabled: true,
      issueDate: '12/2022',
      cardHolder
    };
  }

  // 🎯 Helper pour créer un compte
  createAccount(id, type, number, balance, icon) {
    return {
      id,
      type,
      number,
      balance,
      icon
    };
  }

  getDefaultUsers() {
    return [
      { 
        id: 1, 
        username: '07014860451', 
        password: '260823', 
        name: 'Perrin Jean-Claude', 
        email: 'perrinjean23@gmail.com',
        phone: '+49 176 64 52 52 87',
        accountNumber: '20250000001',
        country: 'Deutschland',
        city: 'Grenoble',
        location: 'Grenoble, Deutschland',
        manager: 'Hans Müller',
        balance: 4100000.50,
        isBlocked: false,
        unlockFee: 0.00,
        blockReason: null,
        rib: {
          iban: 'DE89 3000 5000 0102 0123 4567 88',
          bankCode: '30004',
          branchCode: '00001',
          accountNumber: '00123456789',
          key: '80'
        },
        cards: [
          this.createCard(
            1,
            'Visa Premium',
            '4532 0001 7892 2345',
            '123',
            '10/27',
            'PERRIN JEAN-CLAUDE'
          )
        ],
        accounts: [
          this.createAccount(1, 'Girokonto', 'Nr.*******2284', 4100000.50, 'wallet'),
          this.createAccount(2, 'Sparkonto', 'Nr.*******5462', 30000.40, 'piggybank'),
          this.createAccount(3, 'Tagesgeldkonto', 'Nr.*******8891', 50000.17, 'trending')
        ],
        transactions: [
          this.createTransaction(1, 'Eingehende Überweisung', '02. Dez 2025', 'IE28 *** 513', 40000.00, true),
          this.createTransaction(2, 'Kartenzahlung', '04. Dez 2025', 'REWE BERLIN', 85.50, false),
          this.createTransaction(3, 'Ausgehende Überweisung', '25. Nov 2025', 'DE76 *** 657', 1200.00, false),
          this.createTransaction(4, 'Eingehende Überweisung', '12. Nov 2025', 'US45 *** 234', 3000.00, true),
          this.createTransaction(5, 'Kartenzahlung', '11. Dez 2024', 'UBER BERLIN', 45.20, false),
          this.createTransaction(6, 'Geldautomat', '10. Dez 2024', 'ATM DB BERLIN', 100.00, false),
          this.createTransaction(7, 'Eingehende Überweisung', '08. Dez 2024', 'DE45 *** 891', 500.00, true),
          this.createTransaction(8, 'Kartenzahlung', '07. Dez 2024', 'MEDIA MARKT', 156.80, false),
          this.createTransaction(9, 'Geldautomat', '05. Dez 2024', 'ATM DB HAUPTBAHNHOF', 200.00, false),
          this.createTransaction(10, 'Kartenzahlung', '03. Dez 2024', 'AMAZON DEUTSCHLAND', 67.99, false)
        ],
        expenses: {
          month: 'Dezember 2024',
          categories: [
            { name: 'Wohnen', value: 45, color: '#3B82F6' },
            { name: 'Lebensmittel', value: 25, color: '#10B981' },
            { name: 'Transport', value: 10, color: '#F97316' },
            { name: 'Freizeit', value: 12, color: '#6366F1' },
            { name: 'Sonstiges', value: 8, color: '#D1D5DB' }
          ]
        }
      }
    ];
  }

  async createTransfer(userId, transferData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (DEV_MODE) console.log('💸 Überweisung:', userId, transferData);
        const user = this.users.find(u => u.id === userId);
        
        if (!user) {
          reject(new Error('Benutzer nicht gefunden'));
          return;
        }
        
        if (user.balance < transferData.amount) {
          reject(new Error('Unzureichendes Guthaben'));
          return;
        }
        
        // Déduire le montant
        user.balance -= transferData.amount;
        const girokonto = user.accounts.find(acc => acc.type === 'Girokonto');
        if (girokonto) {
          girokonto.balance -= transferData.amount;
        }
        
        // Créer la transaction
        const newTransaction = this.createTransaction(
          Date.now(),
          'Ausgehende Überweisung',
          new Date().toLocaleDateString('de-DE', { day: '2-digit', month: 'short', year: 'numeric' }),
          transferData.iban ? `${transferData.iban.substring(0, 4)} *** ${transferData.iban.slice(-3)}` : 'Überweisung',
          transferData.amount,
          false
        );
        
        user.transactions.unshift(newTransaction);
        this.saveToStorage();
        
        if (DEV_MODE) console.log('✅ Neuer Kontostand:', user.balance);
        resolve({ 
          success: true, 
          newBalance: user.balance, 
          transaction: newTransaction 
        });
      }, 1000);
    });
  }

  async authenticate(username, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!username || !password) {
          reject(new Error('Benutzername und Passwort erforderlich'));
          return;
        }
        
        if (!/^\d{11}$/.test(username)) {
          reject(new Error('Der Benutzername muss 11 Ziffern enthalten'));
          return;
        }
        
        const user = this.users.find(u => u.username === username && u.password === password);
        
        if (user) { 
          const { password, ...userWithoutPassword } = user; 
          resolve(userWithoutPassword); 
        } else { 
          reject(new Error('Benutzername oder Passwort falsch')); 
        }
      }, 1000);
    });
  }

  async getUserById(userId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (DEV_MODE) console.log('🔍 getUserById:', userId);
        const user = this.users.find(u => u.id === userId);
        
        if (user) { 
          const { password, ...userWithoutPassword } = user;
          if (DEV_MODE) console.log('✅ Benutzer gefunden:', userWithoutPassword.name, 'Kontostand:', userWithoutPassword.balance);
          resolve(userWithoutPassword); 
        } else { 
          reject(new Error('Benutzer nicht gefunden')); 
        }
      }, 100);
    });
  }

  async getUserCards(userId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = this.users.find(u => u.id === userId);
        if (user) {
          resolve(user.cards || []);
        } else {
          reject(new Error('Benutzer nicht gefunden'));
        }
      }, 500);
    });
  }

  async toggleCardStatus(userId, cardId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = this.users.find(u => u.id === userId);
        if (!user) {
          reject(new Error('Benutzer nicht gefunden'));
          return;
        }
        
        const card = user.cards.find(c => c.id === cardId);
        if (!card) {
          reject(new Error('Karte nicht gefunden'));
          return;
        }
        
        card.status = card.status === 'active' ? 'blocked' : 'active';
        this.saveToStorage();
        resolve(card);
      }, 1000);
    });
  }

  async updateCardLimits(userId, cardId, limits) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = this.users.find(u => u.id === userId);
        if (!user) {
          reject(new Error('Benutzer nicht gefunden'));
          return;
        }
        
        const card = user.cards.find(c => c.id === cardId);
        if (!card) {
          reject(new Error('Karte nicht gefunden'));
          return;
        }
        
        if (limits.dailyWithdrawalLimit !== undefined) {
          card.dailyWithdrawalLimit = limits.dailyWithdrawalLimit;
        }
        if (limits.weeklyPaymentLimit !== undefined) {
          card.weeklyPaymentLimit = limits.weeklyPaymentLimit;
        }
        
        this.saveToStorage();
        resolve(card);
      }, 500);
    });
  }

  async toggleInternationalPayment(userId, cardId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = this.users.find(u => u.id === userId);
        if (!user) {
          reject(new Error('Benutzer nicht gefunden'));
          return;
        }
        
        const card = user.cards.find(c => c.id === cardId);
        if (!card) {
          reject(new Error('Karte nicht gefunden'));
          return;
        }
        
        card.internationalPaymentEnabled = !card.internationalPaymentEnabled;
        this.saveToStorage();
        resolve(card);
      }, 500);
    });
  }

  async orderNewCard(userId, cardType = 'Visa Premium') {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = this.users.find(u => u.id === userId);
        if (!user) {
          reject(new Error('Benutzer nicht gefunden'));
          return;
        }
        
        const newCardId = user.cards.length + 1;
        const cardNumber = `4532 ${String(userId).padStart(4, '0')} ${Math.floor(Math.random() * 10000).toString().padStart(4, '0')} ${String(1234 + userId + newCardId).padStart(4, '0')}`;
        
        const newCard = this.createCard(
          newCardId,
          cardType,
          cardNumber,
          Math.floor(100 + Math.random() * 900).toString(),
          '12/29',
          user.name.toUpperCase()
        );
        
        newCard.issueDate = new Date().toLocaleDateString('de-DE', { month: '2-digit', year: 'numeric' });
        newCard.internationalPaymentEnabled = false;
        
        user.cards.push(newCard);
        this.saveToStorage();
        resolve(newCard);
      }, 2000);
    });
  }

  async unlockAccount(userId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const userIndex = this.users.findIndex(u => u.id === userId);
        if (userIndex !== -1) {
          this.users[userIndex].isBlocked = false;
          this.users[userIndex].unlockFee = 0;
          this.users[userIndex].blockReason = null;
          this.saveToStorage();
          
          const { password, ...userWithoutPassword } = this.users[userIndex];
          resolve(userWithoutPassword);
        } else { 
          reject(new Error('Benutzer nicht gefunden')); 
        }
      }, 1000);
    });
  }

  async updateUser(userId, updates) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const userIndex = this.users.findIndex(u => u.id === userId);
        if (userIndex !== -1) {
          this.users[userIndex] = { ...this.users[userIndex], ...updates };
          this.saveToStorage();
          
          const { password, ...userWithoutPassword } = this.users[userIndex];
          resolve(userWithoutPassword);
        } else { 
          reject(new Error('Benutzer nicht gefunden')); 
        }
      }, 500);
    });
  }

  async changePassword(userId, oldPassword, newPassword) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = this.users.find(u => u.id === userId);
        if (!user) {
          reject(new Error('Benutzer nicht gefunden'));
          return;
        }
        
        if (user.password !== oldPassword) {
          reject(new Error('Altes Passwort falsch'));
          return;
        }
        
        if (!/^\d+$/.test(newPassword) || newPassword.length < 6) { 
          reject(new Error('Das Passwort muss mindestens 6 Ziffern enthalten')); 
          return; 
        }
        
        user.password = newPassword;
        this.saveToStorage();
        resolve({ success: true, message: 'Passwort erfolgreich geändert' });
      }, 500);
    });
  }

  async createUser(userData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!/^\d{11}$/.test(userData.username)) {
          reject(new Error('Der Benutzername muss 11 Ziffern enthalten'));
          return;
        }
        
        if (!/^\d+$/.test(userData.password) || userData.password.length < 6) {
          reject(new Error('Das Passwort muss mindestens 6 Ziffern enthalten'));
          return;
        }
        
        const existingUser = this.users.find(u => u.username === userData.username || u.email === userData.email);
        if (existingUser) {
          reject(new Error('Dieser Benutzername oder diese E-Mail existiert bereits'));
          return;
        }
        
        const newUserId = Math.max(...this.users.map(u => u.id)) + 1;
        const newUser = {
          id: newUserId,
          username: userData.username,
          password: userData.password,
          name: userData.name,
          email: userData.email,
          phone: userData.phone || '',
          country: userData.country || '',
          city: userData.city || '',
          location: `${userData.city || ''}, ${userData.country || ''}`,
          accountNumber: `2025${String(newUserId).padStart(7, '0')}`,
          manager: this.managers[Math.floor(Math.random() * this.managers.length)],
          balance: 0,
          isBlocked: false,
          unlockFee: 0,
          blockReason: null,
          rib: {
            iban: `DE${Math.floor(Math.random() * 90) + 10} 30004 ${String(10000 + newUserId).padStart(5, '0')} ${String(Math.floor(Math.random() * 100000000000)).padStart(11, '0')} ${Math.floor(Math.random() * 90) + 10}`,
            bankCode: '30004',
            branchCode: String(10000 + newUserId).padStart(5, '0'),
            accountNumber: String(Math.floor(Math.random() * 100000000000)).padStart(11, '0'),
            key: String(Math.floor(Math.random() * 90) + 10)
          },
          cards: [
            this.createCard(
              1,
              'Visa Premium',
              `4532 ${String(newUserId).padStart(4, '0')} ${Math.floor(Math.random() * 10000).toString().padStart(4, '0')} 1235`,
              Math.floor(100 + Math.random() * 900).toString(),
              '12/29',
              userData.name.toUpperCase(),
              'active'
            )
          ],
          accounts: [
            this.createAccount(1, 'Girokonto', `Nr.*******${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`, 0, 'wallet'),
            this.createAccount(2, 'Sparkonto', `Nr.*******${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`, 0, 'piggybank')
          ],
          transactions: [],
          expenses: { 
            month: 'Dezember 2024', 
            categories: [] 
          }
        };
        
        // Override des limites pour nouveau user
        newUser.cards[0].dailyWithdrawalLimit = 0;
        newUser.cards[0].weeklyPaymentLimit = 0;
        newUser.cards[0].internationalPaymentEnabled = false;
        newUser.cards[0].issueDate = new Date().toLocaleDateString('de-DE', { month: '2-digit', year: 'numeric' });
        
        this.users.push(newUser);
        this.saveToStorage();
        
        const { password, ...userWithoutPassword } = newUser;
        resolve(userWithoutPassword);
      }, 1000);
    });
  }
}

export default new UserService();