// data/index.ts
import type { Project, Service, TeamMember, BlogPost, Testimonial, Stat, SiteConfig } from '@/types'

export const siteConfig: SiteConfig = {
  siteName: 'Rofimain Konstruksi',
  tagline: 'Membangun Impian, Menciptakan Warisan',
  description: 'Perusahaan konstruksi premium terpercaya dengan pengalaman lebih dari 15 tahun dalam membangun hunian mewah, gedung komersial, dan infrastruktur berkualitas tinggi.',
  phone: '+62 21 5555 7890',
  email: 'info@rofimain.com',
  address: 'Menara Sudirman, Lt. 12 Suite A, Jl. Jenderal Sudirman Kav. 60, Jakarta Selatan 12190',
  city: 'Jakarta',
  social: {
    instagram: 'https://instagram.com/rofimain',
    linkedin: 'https://linkedin.com/company/rofimain',
    facebook: 'https://facebook.com/rofimain',
    youtube: 'https://youtube.com/@rofimain',
  },
}

export const stats: Stat[] = [
  { label: 'Tahun Pengalaman', value: '15', suffix: '+', description: 'Berdiri sejak 2009' },
  { label: 'Proyek Selesai', value: '350', suffix: '+', description: 'Di seluruh Indonesia' },
  { label: 'Klien Puas', value: '280', suffix: '+', description: 'Kepercayaan yang terjaga' },
  { label: 'Tim Profesional', value: '120', suffix: '+', description: 'Ahli berpengalaman' },
]

export const projects: Project[] = [
  {
    id: '1',
    slug: 'villa-puncak-elevasi',
    title: 'Villa Puncak Elevasi',
    subtitle: 'Luxury Mountain Retreat',
    category: 'Residensial Mewah',
    location: 'Puncak, Bogor',
    area: '1.200 m²',
    duration: '18 Bulan',
    year: 2024,
    status: 'completed',
    client: 'Private Client',
    description: 'Villa mewah bergaya kontemporer tropis dengan pemandangan pegunungan yang memukau di kawasan Puncak.',
    fullDescription: 'Proyek Villa Puncak Elevasi merupakan perwujudan harmoni antara arsitektur kontemporer dan keindahan alam pegunungan Jawa Barat. Dibangun di atas lahan seluas 1.200 m², villa ini menggabungkan material alami seperti batu alam lokal dan kayu jati dengan teknologi konstruksi modern. Desain terbuka memaksimalkan sirkulasi udara alami dan pemandangan 360 derajat ke arah Gunung Gede dan Pangrango. Fasilitas lengkap meliputi 5 kamar tidur suite, infinity pool, home theater, dan taman botani seluas 500 m².',
    coverImage: '/images/projects/villa-puncak.jpg',
    images: ['/images/projects/villa-puncak-1.jpg', '/images/projects/villa-puncak-2.jpg', '/images/projects/villa-puncak-3.jpg'],
    tags: ['Kontemporer', 'Tropis', 'Mewah', 'Mountain View'],
    featured: true,
    value: 'Rp 12 Miliar',
    architect: 'Budi Santoso Architects',
  },
  {
    id: '2',
    slug: 'tower-bisnis-jakarta',
    title: 'Nexus Business Tower',
    subtitle: 'Grade-A Commercial Office',
    category: 'Komersial',
    location: 'SCBD, Jakarta Selatan',
    area: '45.000 m²',
    duration: '36 Bulan',
    year: 2023,
    status: 'completed',
    client: 'PT Nexus Property Indonesia',
    description: 'Gedung perkantoran Grade-A 32 lantai dengan standar green building LEED Gold di kawasan SCBD Jakarta.',
    fullDescription: 'Nexus Business Tower adalah landmark baru di jantung Sudirman Central Business District. Gedung 32 lantai ini dirancang dengan mempertimbangkan efisiensi energi tertinggi, meraih sertifikasi LEED Gold. Fasad double-skin glass memberikan insulasi termal optimal sekaligus menciptakan tampilan visual yang dramatis. Sistem smart building terintegrasi mengelola pencahayaan, pendinginan, dan keamanan secara otomatis.',
    coverImage: '/images/projects/nexus-tower.jpg',
    images: ['/images/projects/nexus-1.jpg', '/images/projects/nexus-2.jpg'],
    tags: ['High-Rise', 'Green Building', 'LEED', 'Smart Building'],
    featured: true,
    value: 'Rp 280 Miliar',
  },
  {
    id: '3',
    slug: 'resort-bali-uluwatu',
    title: 'Uluwatu Cliff Resort',
    subtitle: 'Boutique Beachfront Resort',
    category: 'Hospitality',
    location: 'Uluwatu, Bali',
    area: '8.500 m²',
    duration: '24 Bulan',
    year: 2023,
    status: 'completed',
    client: 'Horizon Hospitality Group',
    description: 'Resort butik eksklusif di tebing Uluwatu dengan 45 villa private yang menghadap Samudra Hindia.',
    fullDescription: 'Uluwatu Cliff Resort menghadirkan pengalaman menginap yang tak tertandingi di atas tebing dramatis Uluwatu. Setiap dari 45 villa dirancang dengan konsep "infinity to the sea", di mana pool privat setiap villa seolah menyatu dengan cakrawala Samudra Hindia. Konstruksi mempertimbangkan kondisi tanah tebing dan ketahanan terhadap angin laut, dengan menggunakan fondasi micro-pile dan material tahan korosi premium.',
    coverImage: '/images/projects/uluwatu-resort.jpg',
    images: ['/images/projects/uluwatu-1.jpg', '/images/projects/uluwatu-2.jpg'],
    tags: ['Resort', 'Cliff Side', 'Bali', 'Hospitality'],
    featured: true,
    value: 'Rp 95 Miliar',
  },
  {
    id: '4',
    slug: 'perumahan-green-valley',
    title: 'Green Valley Residence',
    subtitle: 'Eco-Friendly Housing Development',
    category: 'Perumahan',
    location: 'Serpong, Tangerang Selatan',
    area: '25.000 m² (120 Unit)',
    duration: '30 Bulan',
    year: 2024,
    status: 'ongoing',
    client: 'PT Green Land Developer',
    description: 'Pengembangan perumahan eco-friendly dengan 120 unit rumah yang mengintegrasikan teknologi solar panel dan sistem daur ulang air.',
    fullDescription: 'Green Valley Residence adalah proyek perumahan masa depan yang menggabungkan kenyamanan hunian premium dengan tanggung jawab lingkungan. Setiap unit dilengkapi panel surya atap, sistem pengolahan air hujan, dan taman vertikal. Kawasan didesain car-free dengan jalur sepeda dan jogging track yang terhubung ke taman komunal seluas 2 hektar.',
    coverImage: '/images/projects/green-valley.jpg',
    images: ['/images/projects/green-valley-1.jpg'],
    tags: ['Eco-Friendly', 'Solar Panel', 'Perumahan', 'Smart Home'],
    featured: true,
    value: 'Rp 180 Miliar',
  },
  {
    id: '5',
    slug: 'restoran-heritage-jakarta',
    title: 'Heritage Grand Dining',
    subtitle: 'Fine Dining Restaurant Interior',
    category: 'Komersial',
    location: 'Menteng, Jakarta Pusat',
    area: '2.800 m²',
    duration: '8 Bulan',
    year: 2023,
    status: 'completed',
    client: 'PT Kuliner Nusantara',
    description: 'Restoran fine dining dengan konsep heritage kolonial Belanda yang dipadukan dengan elemen kontemporer.',
    fullDescription: 'Proyek renovasi bangunan heritage cagar budaya era kolonial menjadi restoran fine dining premium. Pekerjaan restorasi dilakukan dengan penuh kehati-hatian untuk mempertahankan karakter historis bangunan 1920-an sambil mengintegrasikan fasilitas modern. Plafon ukiran kayu asli direstorasi, lantai teraso diperbarui, dan sistem MEP tersembunyi sempurna di balik dinding bersejarah.',
    coverImage: '/images/projects/heritage-dining.jpg',
    images: ['/images/projects/heritage-1.jpg'],
    tags: ['Heritage', 'Restorasi', 'Interior', 'Fine Dining'],
    featured: false,
    value: 'Rp 28 Miliar',
  },
  {
    id: '6',
    slug: 'infrastruktur-jalan-tol',
    title: 'Flyover Akses Pelabuhan',
    subtitle: 'Infrastruktur Jalan Layang',
    category: 'Infrastruktur',
    location: 'Tanjung Priok, Jakarta Utara',
    area: '2,3 km',
    duration: '20 Bulan',
    year: 2022,
    status: 'completed',
    client: 'Kementerian PUPR',
    description: 'Pembangunan jalan layang akses pelabuhan sepanjang 2,3 km untuk mengurangi kemacetan di kawasan Tanjung Priok.',
    fullDescription: 'Proyek flyover akses Pelabuhan Tanjung Priok merupakan solusi infrastruktur kritis untuk memperlancar arus logistik nasional. Konstruksi menggunakan metode Precast Segmental Box Girder yang meminimalkan gangguan lalu lintas selama pembangunan. Pekerjaan dilaksanakan dalam kondisi lalu lintas aktif dengan shift kerja 24 jam untuk memenuhi target penyelesaian.',
    coverImage: '/images/projects/flyover.jpg',
    images: ['/images/projects/flyover-1.jpg'],
    tags: ['Infrastruktur', 'Jalan Layang', 'Pemerintah', 'Precast'],
    featured: false,
    value: 'Rp 340 Miliar',
  },
]

export const services: Service[] = [
  {
    id: '1',
    slug: 'konstruksi-residensial',
    title: 'Konstruksi Residensial',
    subtitle: 'Hunian Premium & Mewah',
    description: 'Membangun hunian impian Anda dengan standar kualitas tertinggi, dari villa mewah hingga perumahan modern.',
    fullDescription: 'Layanan konstruksi residensial kami mencakup seluruh spektrum pembangunan hunian, mulai dari rumah tapak premium, villa eksklusif, hingga apartemen mewah. Tim kami terdiri dari arsitek, desainer interior, dan insinyur struktur berpengalaman yang bekerja secara kolaboratif untuk mewujudkan visi klien menjadi kenyataan.',
    icon: 'Home',
    coverImage: '/images/services/residential.jpg',
    features: [
      'Desain arsitektur custom sesuai keinginan',
      'Material premium grade-A',
      'Manajemen proyek real-time',
      'Garansi konstruksi 10 tahun',
      'Konsultasi desain interior',
      'Sertifikasi IMB & PBG',
    ],
    process: [
      { step: 1, title: 'Konsultasi Awal', description: 'Diskusi mendalam tentang visi, kebutuhan, dan anggaran proyek Anda.' },
      { step: 2, title: 'Desain & Perencanaan', description: 'Tim arsitek membuat konsep desain dan rencana teknis detail.' },
      { step: 3, title: 'Perizinan', description: 'Pengurusan seluruh perizinan yang diperlukan (IMB, PBG, dll).' },
      { step: 4, title: 'Konstruksi', description: 'Pelaksanaan pembangunan dengan pengawasan ketat dan laporan berkala.' },
      { step: 5, title: 'Finishing', description: 'Pekerjaan finishing dan instalasi sistem M&E.' },
      { step: 6, title: 'Serah Terima', description: 'Inspeksi final dan serah terima kunci beserta garansi.' },
    ],
    featured: true,
    order: 1,
  },
  {
    id: '2',
    slug: 'konstruksi-komersial',
    title: 'Konstruksi Komersial',
    subtitle: 'Gedung Perkantoran & Ritel',
    description: 'Pembangunan gedung komersial berkelas dengan teknologi konstruksi terkini dan standar green building internasional.',
    fullDescription: 'Kami spesialis dalam membangun ruang komersial yang tidak hanya fungsional tetapi juga menjadi pernyataan arsitektural. Dari gedung perkantoran Grade-A hingga pusat perbelanjaan, kami mengintegrasikan teknologi smart building dan prinsip keberlanjutan dalam setiap proyek.',
    icon: 'Building2',
    coverImage: '/images/services/commercial.jpg',
    features: [
      'Gedung perkantoran Grade-A',
      'Sertifikasi green building (LEED/Greenship)',
      'Sistem BMS terintegrasi',
      'Manajemen konstruksi profesional',
      'Value engineering',
      'Post-construction maintenance',
    ],
    process: [
      { step: 1, title: 'Studi Kelayakan', description: 'Analisis teknis dan ekonomi proyek secara komprehensif.' },
      { step: 2, title: 'Desain Teknis', description: 'Perancangan struktur, arsitektur, dan sistem MEP.' },
      { step: 3, title: 'Tender & Procurement', description: 'Seleksi subkontraktor dan pengadaan material terbaik.' },
      { step: 4, title: 'Konstruksi', description: 'Pelaksanaan dengan sistem manajemen mutu ISO 9001.' },
      { step: 5, title: 'Commissioning', description: 'Pengujian dan commissioning semua sistem bangunan.' },
      { step: 6, title: 'Handover', description: 'Serah terima dengan sertifikasi laik fungsi (SLF).' },
    ],
    featured: true,
    order: 2,
  },
  {
    id: '3',
    slug: 'desain-interior',
    title: 'Desain Interior',
    subtitle: 'Interior Mewah & Berkarakter',
    description: 'Transformasi ruang interior menjadi karya seni yang fungsional dengan sentuhan estetika tinggi.',
    fullDescription: 'Tim desainer interior kami menggabungkan keahlian teknis dengan sensibilitas artistik untuk menciptakan ruang yang mencerminkan kepribadian dan gaya hidup klien. Dari konsep minimalis modern hingga klasik mewah, kami mengeksekusi setiap detail dengan presisi.',
    icon: 'Palette',
    coverImage: '/images/services/interior.jpg',
    features: [
      'Konsep desain 3D rendering',
      'Custom furniture & joinery',
      'Material impor premium',
      'Pencahayaan artistik',
      'Smart home integration',
      'Project management end-to-end',
    ],
    process: [
      { step: 1, title: 'Mood Board', description: 'Eksplorasi gaya, palet warna, dan material yang sesuai.' },
      { step: 2, title: '3D Visualization', description: 'Rendering 3D fotorealistik untuk persetujuan klien.' },
      { step: 3, title: 'Working Drawing', description: 'Gambar kerja detail untuk semua elemen interior.' },
      { step: 4, title: 'Procurement', description: 'Pengadaan material dan furniture custom/impor.' },
      { step: 5, title: 'Instalasi', description: 'Pemasangan oleh tim instalasi berpengalaman.' },
      { step: 6, title: 'Styling', description: 'Final styling dan dekorasi untuk hasil sempurna.' },
    ],
    featured: true,
    order: 3,
  },
  {
    id: '4',
    slug: 'infrastruktur',
    title: 'Infrastruktur',
    subtitle: 'Jalan, Jembatan & Infrastruktur',
    description: 'Pembangunan infrastruktur publik berkualitas tinggi yang mendukung konektivitas dan pertumbuhan ekonomi.',
    fullDescription: 'Kami memiliki kapasitas teknis dan sumber daya untuk menangani proyek infrastruktur berskala besar. Dengan armada peralatan berat modern dan tim insinyur sipil berpengalaman, kami mampu menyelesaikan proyek infrastruktur sesuai spesifikasi teknis pemerintah.',
    icon: 'Route',
    coverImage: '/images/services/infrastructure.jpg',
    features: [
      'Jalan dan jembatan',
      'Jalan tol dan flyover',
      'Drainase dan irigasi',
      'Infrastruktur pelabuhan',
      'Kawasan industri',
      'Utilitas bawah tanah',
    ],
    process: [
      { step: 1, title: 'Survey & Investigation', description: 'Survei topografi, geoteknik, dan penyelidikan tanah.' },
      { step: 2, title: 'Perencanaan Teknis', description: 'DED dan RAB yang detail dan komprehensif.' },
      { step: 3, title: 'Mobilisasi', description: 'Mobilisasi alat berat dan tenaga kerja terampil.' },
      { step: 4, title: 'Konstruksi', description: 'Pelaksanaan sesuai spesifikasi teknis dan K3L.' },
      { step: 5, title: 'QC & Testing', description: 'Pengujian kualitas material dan pekerjaan.' },
      { step: 6, title: 'Pemeliharaan', description: 'Masa pemeliharaan sesuai kontrak.' },
    ],
    featured: false,
    order: 4,
  },
  {
    id: '5',
    slug: 'renovasi-restorasi',
    title: 'Renovasi & Restorasi',
    subtitle: 'Modernisasi & Pelestarian Bangunan',
    description: 'Spesialis renovasi bangunan lama dan restorasi cagar budaya dengan mempertahankan nilai historis.',
    fullDescription: 'Renovasi dan restorasi membutuhkan keahlian khusus yang memadukan teknik konstruksi modern dengan pemahaman mendalam tentang material dan metode bangunan lama. Tim kami berpengalaman dalam menangani bangunan heritage sambil meningkatkan fungsi dan kenyamanannya.',
    icon: 'Hammer',
    coverImage: '/images/services/renovation.jpg',
    features: [
      'Restorasi bangunan heritage',
      'Renovasi total & parsial',
      'Alih fungsi bangunan',
      'Structural strengthening',
      'Facade restoration',
      'MEP upgrade',
    ],
    process: [
      { step: 1, title: 'Asesmen Bangunan', description: 'Evaluasi kondisi struktural dan arsitektural existing.' },
      { step: 2, title: 'Konsep Renovasi', description: 'Perencanaan renovasi yang menghormati karakter bangunan.' },
      { step: 3, title: 'Dokumentasi', description: 'Dokumentasi dan pengurusan izin renovasi/restorasi.' },
      { step: 4, title: 'Pelaksanaan', description: 'Renovasi dengan teknik dan material yang tepat.' },
      { step: 5, title: 'Restorasi Detail', description: 'Restorasi elemen dekoratif dan arsitektural.' },
      { step: 6, title: 'Serah Terima', description: 'Handover dengan dokumentasi as-built lengkap.' },
    ],
    featured: false,
    order: 5,
  },
  {
    id: '6',
    slug: 'manajemen-proyek',
    title: 'Manajemen Proyek',
    subtitle: 'Owner Representative & PM',
    description: 'Layanan manajemen proyek profesional sebagai wakil pemilik untuk memastikan kualitas, waktu, dan anggaran terpenuhi.',
    fullDescription: 'Layanan Project Management kami menempatkan klien sebagai pusat dari setiap keputusan. Sebagai Owner Representative yang independen, kami mengawasi kontraktor, memvalidasi tagihan, mengelola risiko, dan memastikan proyek berjalan sesuai rencana tanpa bias kepentingan.',
    icon: 'ClipboardList',
    coverImage: '/images/services/project-management.jpg',
    features: [
      'Owner representative',
      'Project monitoring & control',
      'Contract management',
      'Quality assurance',
      'Cost control & reporting',
      'Risk management',
    ],
    process: [
      { step: 1, title: 'Kick-Off', description: 'Penyusunan project charter dan rencana manajemen.' },
      { step: 2, title: 'Planning', description: 'Jadwal induk, rencana mutu, dan manajemen risiko.' },
      { step: 3, title: 'Monitoring', description: 'Pemantauan progres harian, mingguan, dan bulanan.' },
      { step: 4, title: 'Controlling', description: 'Tindakan korektif terhadap deviasi dari rencana.' },
      { step: 5, title: 'Reporting', description: 'Laporan progres dan dashboard untuk manajemen klien.' },
      { step: 6, title: 'Closure', description: 'Proses penutupan proyek dan dokumentasi pelajaran.' },
    ],
    featured: false,
    order: 6,
  },
]

export const team: TeamMember[] = [
  {
    id: '1',
    name: 'Ir. Andika Prasetyo, M.T.',
    role: 'Direktur Utama & Founder',
    bio: 'Lebih dari 20 tahun pengalaman di industri konstruksi Indonesia. Alumni ITB Teknik Sipil dan S2 dari Delft University of Technology, Belanda.',
    image: '/images/team/andika.jpg',
    social: { linkedin: '#', instagram: '#' },
  },
  {
    id: '2',
    name: 'Dra. Sari Wijayanti, M.Arch.',
    role: 'Direktur Desain & Arsitektur',
    bio: 'Arsitek terkemuka dengan portofolio mencakup 80+ proyek residensial dan komersial. Lulusan Universitas Indonesia dan Harvard GSD.',
    image: '/images/team/sari.jpg',
    social: { linkedin: '#', instagram: '#' },
  },
  {
    id: '3',
    name: 'Budi Hartono, S.T., M.M.',
    role: 'Direktur Operasional',
    bio: 'Spesialis manajemen konstruksi dengan keahlian dalam value engineering dan optimalisasi proses pembangunan.',
    image: '/images/team/budi.jpg',
    social: { linkedin: '#' },
  },
  {
    id: '4',
    name: 'Dr. Maya Kusuma, M.T.',
    role: 'Kepala Divisi Teknik',
    bio: 'Insinyur struktur berpengalaman dalam desain gedung tinggi dan infrastruktur. Doktor Teknik dari UI dengan spesialisasi geoteknik.',
    image: '/images/team/maya.jpg',
    social: { linkedin: '#', instagram: '#' },
  },
]

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Hendro Sugiarto',
    role: 'CEO',
    company: 'PT Nexus Property Indonesia',
    content: 'Rofimain Konstruksi membangun Nexus Business Tower kami tepat waktu dan sesuai anggaran. Kualitas hasil kerja mereka melampaui ekspektasi kami. Manajemen proyek yang profesional dan komunikasi yang transparan membuat proses ini sangat nyaman.',
    rating: 5,
    image: '/images/testimonials/hendro.jpg',
    projectId: '2',
  },
  {
    id: '2',
    name: 'Jennifer Tan',
    role: 'Owner',
    company: 'Horizon Hospitality Group',
    content: 'Resort kami di Uluwatu menjadi kenyataan berkat keahlian ROFIMAIN. Mereka berhasil mengatasi tantangan konstruksi di tebing yang sangat teknis dengan tetap menjaga jadwal. Hasilnya benar-benar luar biasa dan tamu kami selalu kagum.',
    rating: 5,
    image: '/images/testimonials/jennifer.jpg',
    projectId: '3',
  },
  {
    id: '3',
    name: 'Eko Prabowo',
    role: 'Direktur',
    company: 'PT Green Land Developer',
    content: 'Kami memilih ROFIMAIN untuk proyek eco-housing kami karena rekam jejak mereka yang luar biasa. Tim mereka memahami konsep green building dengan sangat baik dan memberikan solusi inovatif yang menghemat biaya jangka panjang.',
    rating: 5,
    image: '/images/testimonials/eko.jpg',
    projectId: '4',
  },
  {
    id: '4',
    name: 'Ratna Dewi',
    role: 'Homeowner',
    company: '',
    content: 'Membangun villa impian di Puncak bersama ROFIMAIN adalah pengalaman yang menyenangkan. Mereka sangat memperhatikan setiap detail dan selalu berkomunikasi dengan baik. Hasil akhirnya jauh melebihi yang saya bayangkan!',
    rating: 5,
    image: '/images/testimonials/ratna.jpg',
    projectId: '1',
  },
]

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'tren-arsitektur-tropis-2024',
    title: 'Tren Arsitektur Tropis Modern 2024: Harmoni Alam dan Teknologi',
    excerpt: 'Eksplorasi tren terbaru dalam arsitektur tropis yang mengintegrasikan material alami, ventilasi pasif, dan teknologi smart building untuk menciptakan hunian nyaman dan berkelanjutan.',
    content: `# Tren Arsitektur Tropis Modern 2024

Arsitektur tropis modern sedang mengalami renaissance yang menarik. Setelah bertahun-tahun didominasi oleh gaya internasional yang homogen, kini kita menyaksikan kebangkitan pendekatan yang lebih kontekstual dan responsif terhadap iklim tropis Indonesia.

## 1. Biophilic Design

Biophilic design—integrasi elemen alam ke dalam lingkungan binaan—menjadi semakin populer. Taman vertikal, void dengan pohon besar, dan material organik tidak lagi menjadi kemewahan tetapi standar baru hunian premium.

## 2. Material Lokal Premium

Penggunaan material lokal seperti batu vulkanik, bambu rekayasa (engineered bamboo), dan kayu bersertifikat FSC mengalami peningkatan signifikan. Selain nilai estetika yang unik, pendekatan ini mendukung ekonomi lokal dan mengurangi jejak karbon.

## 3. Passive Cooling Systems

Di tengah tantangan perubahan iklim, sistem pendinginan pasif menjadi semakin relevan. Double roof, cross ventilation yang terencana, dan orientasi bangunan yang tepat dapat mengurangi beban pendinginan hingga 40%.

## 4. Smart Home Integration

Rumah tropis modern tidak lagi berarti sederhana. Sistem otomasi rumah yang dapat mengontrol pencahayaan, HVAC, dan keamanan secara terpadu menjadi standar baru dalam hunian premium.`,
    author: 'Dra. Sari Wijayanti',
    authorImage: '/images/team/sari.jpg',
    category: 'Arsitektur',
    tags: ['Tropis', 'Arsitektur', 'Desain', '2024'],
    coverImage: '/images/blog/arsitektur-tropis.jpg',
    publishedAt: '2024-03-15',
    featured: true,
    readTime: 6,
  },
  {
    id: '2',
    slug: 'green-building-indonesia',
    title: 'Green Building di Indonesia: Mengapa Investasi Berkelanjutan Menguntungkan',
    excerpt: 'Bangunan hijau bukan sekadar tren—ini adalah investasi cerdas yang memberikan penghematan energi signifikan dan nilai aset yang lebih tinggi dalam jangka panjang.',
    content: `# Green Building: Investasi Masa Depan

Indonesia memiliki potensi luar biasa dalam pengembangan bangunan hijau. Dengan iklim tropis yang melimpah sinar matahari, pemanfaatan energi surya bisa menghasilkan penghematan biaya operasional yang signifikan.

## Mengapa Green Building?

Bangunan konvensional mengonsumsi sekitar 40% energi total secara global. Green building dapat mengurangi konsumsi ini hingga 50-60% melalui desain pasif, sistem efisiensi energi aktif, dan sumber energi terbarukan.

## ROI yang Menarik

Meskipun biaya konstruksi green building 5-15% lebih tinggi, penghematan operasional selama 10 tahun umumnya sudah melampaui investasi awal tersebut.`,
    author: 'Ir. Andika Prasetyo',
    authorImage: '/images/team/andika.jpg',
    category: 'Keberlanjutan',
    tags: ['Green Building', 'Investasi', 'Keberlanjutan', 'LEED'],
    coverImage: '/images/blog/green-building.jpg',
    publishedAt: '2024-02-20',
    featured: true,
    readTime: 8,
  },
  {
    id: '3',
    slug: 'teknologi-konstruksi-bim',
    title: 'Revolusi BIM: Bagaimana Teknologi Mengubah Industri Konstruksi',
    excerpt: 'Building Information Modeling (BIM) sedang merevolusi cara kita merencanakan, membangun, dan mengelola bangunan. Pelajari bagaimana ROFIMAIN memanfaatkan teknologi ini.',
    content: `# BIM: Masa Depan Konstruksi

Building Information Modeling (BIM) bukan sekadar software desain 3D—ini adalah platform kolaborasi yang mengintegrasikan seluruh aspek siklus hidup bangunan ke dalam satu model digital terpadu.

## Manfaat BIM

- **Clash Detection**: Mendeteksi konflik desain sebelum konstruksi, menghemat biaya koreksi lapangan
- **Quantity Takeoff**: Perhitungan volume dan biaya yang akurat langsung dari model
- **Construction Sequencing**: Simulasi 4D (3D + waktu) untuk perencanaan konstruksi yang optimal
- **Facility Management**: Model BIM menjadi basis data untuk manajemen fasilitas pasca konstruksi`,
    author: 'Budi Hartono',
    authorImage: '/images/team/budi.jpg',
    category: 'Teknologi',
    tags: ['BIM', 'Teknologi', 'Digital Construction'],
    coverImage: '/images/blog/bim-technology.jpg',
    publishedAt: '2024-01-10',
    featured: false,
    readTime: 5,
  },
]
