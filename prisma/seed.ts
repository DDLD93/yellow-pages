import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

// Load environment variables (prisma.config.ts already does this, but ensure it's loaded)
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set');
}

// Create adapter with Pool (standard approach for PrismaPg)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
  log: ['error', 'warn'],
});

async function main() {
  console.log('🌱 Starting database seed...');

  // Clear existing data
  console.log('🗑️  Clearing existing data...');
  await prisma.searchLog.deleteMany();
  await prisma.businessRegistration.deleteMany();
  await prisma.business.deleteMany();

  // Sample data
  const categories = [
    'Retail & Trading',
    'Food & Beverage',
    'Fashion & Apparel',
    'Technology & IT',
    'Health & Wellness',
    'Education & Training',
    'Construction & Real Estate',
    'Transportation & Logistics',
    'Agriculture & Farming',
    'Beauty & Personal Care',
    'Entertainment & Events',
    'Financial Services',
  ];

  const lgas = [
    'Kaduna North',
    'Kaduna South',
    'Chikun',
    'Igabi',
    'Ikara',
    'Jaba',
    'Jema\'a',
    'Kachia',
    'Kaduna North',
    'Kaduna South',
    'Kagarko',
    'Kajuru',
    'Kaura',
    'Kauru',
    'Kubau',
    'Kudan',
    'Lere',
    'Makarfi',
    'Sabon Gari',
    'Sanga',
    'Soba',
    'Zangon Kataf',
    'Zaria',
  ];

  const wards = [
    'Ward A',
    'Ward B',
    'Ward C',
    'Central Ward',
    'North Ward',
    'South Ward',
    'East Ward',
    'West Ward',
  ];

  const businessNames = [
    'Ahmadu Electronics Store',
    'Fatima Fashion Boutique',
    'Ibrahim Tech Solutions',
    'Amina Beauty Salon',
    'Musa Construction Ltd',
    'Hauwa Restaurant',
    'Yusuf Auto Parts',
    'Zainab Pharmacy',
    'Mohammed Furniture Store',
    'Aisha Grocery Mart',
    'Ali Computer Services',
    'Khadija Tailoring Shop',
    'Hassan Transport Services',
    'Maryam Bakery',
    'Umar Hardware Store',
    'Rukayya Event Planning',
    'Ibrahim Printing Press',
    'Amina Learning Center',
    'Musa Agricultural Supplies',
    'Fatima Gift Shop',
    'Yusuf Mobile Phone Store',
    'Hauwa Cleaning Services',
    'Ahmadu Car Wash',
    'Zainab Bookstore',
    'Mohammed Plumbing Services',
    'Aisha Hair Salon',
    'Ali Electronics Repair',
    'Khadija Catering Services',
    'Hassan Security Services',
    'Maryam Stationery Shop',
  ];

  const statuses = ['Eligible', 'Disbursed', 'Pending', 'Rejected'];
  const registrationStatuses = ['Pending', 'Reviewed', 'Approved', 'Rejected'];

  // Create Businesses
  console.log('📊 Creating businesses...');
  const businesses = [];
  for (let i = 0; i < 50; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const lga = lgas[Math.floor(Math.random() * lgas.length)];
    const ward = Math.random() > 0.3 ? wards[Math.floor(Math.random() * wards.length)] : null;
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const businessName = businessNames[Math.floor(Math.random() * businessNames.length)] + (i > 0 ? ` ${i}` : '');

    const business = await prisma.business.create({
      data: {
        businessName,
        businessRegCatType: category,
        businessLGA: lga,
        businessWard: ward,
        businessAddress: `${Math.floor(Math.random() * 999) + 1} Main Street, ${lga}`,
        status,
        phone: `+234${Math.floor(Math.random() * 9000000000) + 1000000000}`,
        email: Math.random() > 0.4 ? `contact@${businessName.toLowerCase().replace(/\s+/g, '')}.com` : null,
        website: Math.random() > 0.6 ? `https://www.${businessName.toLowerCase().replace(/\s+/g, '')}.com` : null,
        latitude: 10.5 + (Math.random() * 0.5),
        longitude: 7.4 + (Math.random() * 0.5),
        // Sensitive fields (for testing)
        bvn: Math.random() > 0.7 ? `${Math.floor(Math.random() * 90000000000) + 10000000000}` : null,
        dob: Math.random() > 0.7 ? new Date(1970 + Math.floor(Math.random() * 30), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1) : null,
        bankAccountNumber: Math.random() > 0.7 ? `${Math.floor(Math.random() * 9000000000) + 1000000000}` : null,
        bankName: Math.random() > 0.7 ? ['GTBank', 'Access Bank', 'First Bank', 'Zenith Bank', 'UBA'][Math.floor(Math.random() * 5)] : null,
      },
    });
    businesses.push(business);
  }
  console.log(`✅ Created ${businesses.length} businesses`);

  // Create Business Registrations
  console.log('📝 Creating business registrations...');
  const registrations = [];
  for (let i = 0; i < 20; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const lga = lgas[Math.floor(Math.random() * lgas.length)];
    const ward = Math.random() > 0.3 ? wards[Math.floor(Math.random() * wards.length)] : null;
    const status = registrationStatuses[Math.floor(Math.random() * registrationStatuses.length)];
    const businessName = `New ${businessNames[Math.floor(Math.random() * businessNames.length)]} ${i}`;

    const registration = await prisma.businessRegistration.create({
      data: {
        businessName,
        businessRegCatType: category,
        businessLGA: lga,
        businessWard: ward,
        businessAddress: `${Math.floor(Math.random() * 999) + 1} Main Street, ${lga}`,
        ownerFirstName: ['Ahmadu', 'Fatima', 'Ibrahim', 'Amina', 'Musa', 'Hauwa', 'Yusuf', 'Zainab'][Math.floor(Math.random() * 8)],
        ownerSurname: ['Mohammed', 'Ibrahim', 'Ali', 'Hassan', 'Umar', 'Ahmad', 'Sani', 'Bello'][Math.floor(Math.random() * 8)],
        phone: `+234${Math.floor(Math.random() * 9000000000) + 1000000000}`,
        email: Math.random() > 0.3 ? `owner@${businessName.toLowerCase().replace(/\s+/g, '')}.com` : null,
        status,
      },
    });
    registrations.push(registration);
  }
  console.log(`✅ Created ${registrations.length} business registrations`);

  // Create Search Logs
  console.log('🔍 Creating search logs...');
  const searchQueries = [
    'electronics',
    'restaurant',
    'fashion',
    'pharmacy',
    'construction',
    'beauty salon',
    'grocery',
    'hardware',
    'transport',
    'education',
    null, // Some searches without query
  ];

  const searchLogs = [];
  for (let i = 0; i < 100; i++) {
    const query = searchQueries[Math.floor(Math.random() * searchQueries.length)];
    const lga = Math.random() > 0.5 ? lgas[Math.floor(Math.random() * lgas.length)] : null;
    const category = Math.random() > 0.6 ? categories[Math.floor(Math.random() * categories.length)] : null;
    const verified = Math.random() > 0.5 ? Math.random() > 0.5 : null;
    const resultsCount = Math.floor(Math.random() * 50) + 1;

    // Create search log with date in the past (last 30 days)
    const daysAgo = Math.floor(Math.random() * 30);
    const createdAt = new Date();
    createdAt.setDate(createdAt.getDate() - daysAgo);
    createdAt.setHours(Math.floor(Math.random() * 24));
    createdAt.setMinutes(Math.floor(Math.random() * 60));

    const searchLog = await prisma.searchLog.create({
      data: {
        query,
        lga,
        category,
        verified,
        resultsCount,
        ipAddress: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
        userAgent: [
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15',
          'Mozilla/5.0 (Android 10; Mobile; rv:81.0) Gecko/81.0 Firefox/81.0',
        ][Math.floor(Math.random() * 3)],
        createdAt,
      },
    });
    searchLogs.push(searchLog);
  }
  console.log(`✅ Created ${searchLogs.length} search logs`);

  console.log('\n✨ Seed completed successfully!');
  console.log(`📊 Summary:`);
  console.log(`   - Businesses: ${businesses.length}`);
  console.log(`   - Business Registrations: ${registrations.length}`);
  console.log(`   - Search Logs: ${searchLogs.length}`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });

