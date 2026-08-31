import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
import { newsItems } from '../data/news'
import { teamMembers } from '../data/members'
import { researchItems } from '../data/research'
// Note: mapData and gallery images are currently hardcoded in components
// I will extract them here for the migration.

const mapDataRaw = [
  {
    start: { lat: 37.8044, lng: -122.2711, country: "Oakland, CA, USA" },
    end: { lat: 49.2827, lng: -123.1207, country: "Vancouver, Canada" },
  },
  {
    start: { lat: 43.6532, lng: -79.3832, country: "Toronto, Canada" },
    end: { lat: 49.2827, lng: -123.1207, country: "Vancouver, Canada" },
  },
  {
    start: {
      lat: 40.2959,
      lng: -74.8702,
      country: "Washington Crossing, PA, USA",
    },
    end: { lat: 37.5407, lng: -77.436, country: "Richmond, VA, USA" },
  },
  {
    start: { lat: 37.5407, lng: -77.436, country: "Richmond, VA, USA" },
    end: { lat: 43.1566, lng: -77.6088, country: "Rochester, NY, USA" },
  },
  {
    start: { lat: 42.3214, lng: -83.333, country: "Garden City, MI, USA" },
    end: { lat: 42.3314, lng: -83.0458, country: "Detroit, MI, USA" },
  },
  {
    start: { lat: 42.5767, lng: -83.3813, country: "West Bloomfield, MI, USA" },
    end: { lat: 42.2808, lng: -83.743, country: "Ann Arbor, MI, USA" },
  },
  {
    start: { lat: 42.3314, lng: -83.0458, country: "Detroit, MI, USA" },
    end: { lat: 42.2808, lng: -83.743, country: "Ann Arbor, MI, USA" },
  },
  {
    start: { lat: 42.6064, lng: -83.1498, country: "Troy, MI, USA" },
    end: { lat: 42.2808, lng: -83.743, country: "Ann Arbor, MI, USA" },
  },
  {
    start: { lat: 44.7629, lng: -85.6210, country: "Traverse City, MI, USA" },
    end: { lat: 42.6064, lng: -83.1498, country: "Troy, MI, USA" },
  },
  {
    start: { lat: 42.1103, lng: -88.0342, country: "Palatine, IL, USA" },
    end: { lat: 41.4817, lng: -81.8001, country: "Lakewood, OH, USA" },
  },
  {
    start: { lat: 40.839, lng: -74.275, country: "Caldwell, NJ, USA" },
    end: { lat: 41.4817, lng: -81.8001, country: "Lakewood, OH, USA" },
  },
  {
    start: { lat: 36.1627, lng: -86.7816, country: "Nashville, TN, USA" },
    end: { lat: 33.5207, lng: -86.8025, country: "Birmingham, AL, USA" },
  },
  {
    start: { lat: 41.4817, lng: -81.8001, country: "Lakewood, OH, USA" },
    end: { lat: 36.1627, lng: -86.7816, country: "Nashville, TN, USA" },
  },
  {
    start: { lat: 49.2827, lng: -123.1207, country: "Vancouver, Canada" },
    end: { lat: 37.5407, lng: -77.436, country: "Richmond, VA, USA" },
  },
  {
    start: { lat: 42.1103, lng: -88.0342, country: "Palatine, IL, USA" },
    end: {
      lat: 40.2959,
      lng: -74.8702,
      country: "Washington Crossing, PA, USA",
    },
  },
  {
    start: { lat: 42.1103, lng: -88.0342, country: "Palatine, IL, USA" },
    end: { lat: 37.8044, lng: -122.2711, country: "Oakland, CA, USA" },
  },
  {
    start: { lat: 41.4817, lng: -81.8001, country: "Lakewood, OH, USA" },
    end: { lat: 43.1566, lng: -77.6088, country: "Rochester, NY, USA" },
  },
  {
    start: { lat: 38.9072, lng: -77.0369, country: "Washington, D.C., USA" },
    end: { lat: 43.1566, lng: -77.6088, country: "Rochester, NY, USA" },
  },
  {
    start: { lat: 36.3504, lng: 127.3845, country: "Daejeon, South Korea" },
    end: { lat: 32.0617, lng: 118.7778, country: "Jiangsu, China" },
  },
  {
    start: { lat: 37.5503, lng: 126.9971, country: "Seoul, South Korea" },
    end: { lat: 36.3504, lng: 127.3845, country: "Daejeon, South Korea" },
  },
  {
    start: { lat: 32.0617, lng: 118.7778, country: "Jiangsu, China" },
    end: { lat: 25.044, lng: 102.7053, country: "Kunming, China" },
  },
  {
    start: { lat: 25.044, lng: 102.7053, country: "Kunming, China" },
    end: { lat: 3.139, lng: 101.6869, country: "Kuala Lumpur, Malaysia" },
  },
  {
    start: { lat: 24.8138, lng: 120.9675, country: "Hsinchu, Taiwan" },
    end: { lat: 3.139, lng: 101.6869, country: "Kuala Lumpur, Malaysia" },
  },
  {
    start: { lat: 3.139, lng: 101.6869, country: "Kuala Lumpur, Malaysia" },
    end: { lat: 14.5864, lng: 121.1747, country: "Antipolo, Philippines" },
  },
  {
    start: { lat: 6.1944, lng: 106.8229, country: "Jakarta, Indonesia" },
    end: { lat: 3.139, lng: 101.6869, country: "Kuala Lumpur, Malaysia" },
  },
  {
    start: { lat: 23.8103, lng: 90.4125, country: "Dhaka, Bangladesh" },
    end: { lat: 25.044, lng: 102.7053, country: "Kunming, China" },
  },
  {
    start: { lat: 23.8103, lng: 90.4125, country: "Dhaka, Bangladesh" },
    end: { lat: 26.9124, lng: 75.7873, country: "Jaipur, India" },
  },
  {
    start: { lat: 26.9124, lng: 75.7873, country: "Jaipur, India" },
    end: { lat: 30.3165, lng: 78.0322, country: "Dehradun, India" },
  },
  {
    start: { lat: 12.9629, lng: 77.5775, country: "Bangalore, India" },
    end: { lat: 28.7041, lng: 77.1025, country: "Delhi, India" },
  },
  {
    start: { lat: 28.7041, lng: 77.1025, country: "Delhi, India" },
    end: { lat: 30.3165, lng: 78.0322, country: "Dehradun, India" },
  },
  {
    start: { lat: 18.5246, lng: 73.8786, country: "Pune, India" },
    end: { lat: 28.7041, lng: 77.1025, country: "Delhi, India" },
  },
  {
    start: { lat: 30.3165, lng: 78.0322, country: "Dehradun, India" },
    end: { lat: 26.326, lng: 43.975, country: "Qassim, Saudi Arabia" },
  },
  {
    start: { lat: 26.326, lng: 43.975, country: "Qassim, Saudi Arabia" },
    end: { lat: 32.5568, lng: 35.847, country: "Irbid, Jordan" },
  },
  {
    start: { lat: 32.5568, lng: 35.847, country: "Irbid, Jordan" },
    end: { lat: 41.0082, lng: 28.9784, country: "Istanbul, Turkey" },
  },
  {
    start: { lat: 41.0082, lng: 28.9784, country: "Istanbul, Turkey" },
    end: { lat: 45.8575, lng: 2.3514, country: "Paris, France" },
  },
  {
    start: { lat: 45.8575, lng: 2.3514, country: "Paris, France" },
    end: { lat: 43.1566, lng: -77.6088, country: "Rochester, NY, USA" },
  },
  {
    start: { lat: 41.0082, lng: 28.9784, country: "Istanbul, Turkey" },
    end: { lat: 50.4501, lng: 30.5234, country: "Kyiv, Ukraine" },
  },
  {
    start: { lat: 41.0082, lng: 28.9784, country: "Istanbul, Turkey" },
    end: { lat: 8.5, lng: 4.55, country: "Ilorin, Nigeria" },
  },
  {
    start: { lat: 8.5, lng: 4.55, country: "Ilorin, Nigeria" },
    end: { lat: 14.7167, lng: -15.4677, country: "Dakar, Senegal" },
  },
  {
    start: { lat: 14.7167, lng: -15.4677, country: "Dakar, Senegal" },
    end: { lat: 33.5207, lng: -86.8025, country: "Birmingham, AL, USA" },
  },
];

const galleryHome = [
  { src: "/homepage/gallery/3_Majdi-Engaging-Style.jpg", title: "Majdi's with full confidence while bragging about how much student loves him in the classroom because of his engaging style: “I've gotten animals to pose for photos with me, you really think engaging students is gonna be a challenge?”" },
  { src: "/homepage/gallery/4_Leo-Nabila-Sleeping.jpg", title: "Leo and Nabila's reactions when Majdi starts complaining about his administrative loads, us not meeting deadlines, being behind on research, and so on. Meanwhile Kamal listens carefully as he plans to become a faculty!" },
  { src: "/homepage/gallery/6_Nabila-Japan.jpg", title: "Nabila (a.k.a Meredith-2.0) does not let any workshop or nuclear event miss h er no matter where it is. Photo from the Fukushima - Daiichi site in Japan!" },
  { src: "/homepage/gallery/7_Idaho-Smiles.jpeg", title: "AIMS students and alumni snapped a photo in Idaho Falls during a conference. Meanwhile, Majdi stood there, baffled, wondering: “Have I ever seen them this happy before? Is it me... or is Idaho Falls way more fun than Ann Arbor?” Tough call. What do you think?" },
  { src: "/homepage/gallery/15_Jacob-Out.jpg", title: "Part of our core values is “Support”. Here we support Jacob and push him out of Michigan as he graduates and joins Westinghouse." },
  { src: "/homepage/gallery/17_Lada-Loyality-Photo.jpg", title: "Lada is being super loyal to the photographer. Till today, we have no idea what we were all looking at here and why Lada was completely disinterested." },
  { src: "/homepage/gallery/20_RisingStars.jpg", title: "You are a true AIMS if you can find one AIMS member in this picture and a loyal NERS and Wolverine if you can find two more people from NERS!" },
  { src: "/homepage/gallery/29_Student-Internships.png", title: "We tell Majdi we're working super hard during our internships, and people are basic ally blown away by our brilliance. A spy then sends him this." },
];

const galleryFull = [
  {
    text: "Dinner from the M&C-2025 conference in Denver with AIMS members celebrating Majdi’s Young Researcher Achievement Award. Leo is the main suspect for messing up group photos—thanks to his real-time blinking. Meanwhile, Nataly is doing her best to prove Majdi wrong about her being the second person to blame for ruining pictures.",
    image: "/gallery/0_MC-dinner.jpg",
  },
  {
    text: "Leo exploring other career avenues if his PhD did not work out. His fanbase currently has two.",
    image: "/gallery/1_Leo-Other-Career.jpg",
  },
  {
    text: "Our reaction when Majdi says the group meeting is cancelled.",
    image: "/gallery/2_Meeting_Cancelled.jpeg",
  },
  {
    text: 'Majdi’s with full confidence while bragging about how much student loves him in the classroom because of his engaging style: "I’ve gotten animals to pose for photos with me, you really think engaging students is gonna be a challenge?"',
    image: "/gallery/3_Majdi-Engaging-Style.jpg",
  },
  {
    text: "Leo and Nabila’s reactions when Majdi starts complaining about his administrative loads, us not meeting deadlines, being behind on research, and so on. Meanwhile Kamal listens carefully as he plans to become a faculty!",
    image: "/gallery/4_Leo-Nabila-Sleeping.jpg",
  },
  {
    text: "Meredith after she promised Majdi she will stop travelling to all events and workshops and settle down to get her PhD done. Picture from COP28 in UAE.",
    image: "/gallery/5_Meredith-COP28.png",
  },
  {
    text: "Nabila (a.k.a Meredith – 2.0) does not let any workshop or nuclear event miss her no matter where it is. Photo from the Fukushima-Daiichi site in Japan!",
    image: "/gallery/6_Nabila-Japan.jpg",
  },
  {
    text: 'AIMS students and alumni snapped a photo in Idaho Falls during a conference. Meanwhile, Majdi stood there, baffled, wondering: "Have I ever seen them this happy before? Is it me... or is Idaho Falls way more fun than Ann Arbor?" Tough call. What do you think?',
    image: "/gallery/7_Idaho-Smiles.jpeg",
  },
  {
    text: "Nataly’s lifecycle in AIMS: She overcommits to numerous tasks, ends up in trouble, feels overwhelmed, then blames Majdi for that, and finally smiles when the mission is accomplished.",
    image: "/gallery/8_Nataly-Smile.png",
  },
  {
    text: "Andre reaction when Majdi misspells his name for the thousand time by adding “i” to the end of his name while texting on Slack. Sorry Andrei, I will NOT do this again.",
    image: "/gallery/9_Andre-Misspell.jpg",
  },
  {
    text: 'Logan, keeping a straight face like a true professional, as Majdi cheerfully announces he\'s about to whip up some "easy" CAD drawings — meanwhile, Logan’s never touched CAD in his life and is internally screaming.',
    image: "/gallery/10_Logan-CAD.jpg",
  },
  {
    text: "Majdi’s face after winning an argument with us …",
    image: "/gallery/11_Majdi-Wins-Argument.png",
  },
  {
    text: "When he loses the argument …",
    image: "/gallery/12_Majdi-loses-argument.jpg",
  },
  {
    text: "Claire (Cal) typical explanation on missing group meetings and not responding to Slack.",
    image: "/gallery/13_Claire-Studying.png",
  },
  {
    text: "Our expectation and dreams of the food to be served in the group meetings while Majdi insists that he does not serve that because he cares about our health and fitness in the first place.",
    image: "/gallery/14_food.JPG",
  },
  {
    text: "Part of our core values is “Support”. Here we support Jacob and push him out of Michigan as he graduates and joins Westinghouse",
    image: "/gallery/15_Jacob-Out.jpg",
  },
  {
    text: "Jazmin with the pic of the year during her visit to the Fermi-2 power plant in Michigan.",
    image: "/gallery/16_Jazmin-AIMSPicYear.jpg",
  },
  {
    text: "Lada is being super loyal to the photographer. Till today, we have no idea what we were all looking at here and why Lada was completely disinterested.",
    image: "/gallery/17_Lada-Loyality-Photo.jpg",
  },
  {
    text: "Majdi after giving us a long lecture about hardwork and dedication. Photo Credit: The brave Leo Tunkle",
    image: "/gallery/18_Majdi-Relax-After-Crticism.jpg",
  },
  {
    text: "Majdi when asked whether he dares making a joke about all people in this picture: “I do not want to ruin my life” We have the most bright and talented women in the field (and this is not a joke).",
    image: "/gallery/19_AIMS-women.jpg",
  },
  {
    text: "You are a true AIMS if you can find one AIMS member in this picture and a loyal NERS and Wolverine if you can find two more people from NERS!",
    image: "/gallery/20_RisingStars.jpg",
  },
  {
    text: "Majdi at the early career panel at the ANS 2024 Winter conference in Orlando, FL. This picture is also his way to remind us that he was a superstar scientist in the past before being buried in management.",
    image: "/gallery/21_Majdi-Early-Career.jpg",
  },
  {
    text: "Majdi’s first award in Michigan was a water bottle and a backpack after winning best faculty pitch award. When asked about the award: “It is true I was thirsty after the pitch, but I did not expect the prize to be a water bottle”.",
    image: "/gallery/22_Majdi-first-award.png",
  },
  {
    text: "The hardest part to get this picture done was to find two people in AIMS who have close heights!",
    image: "/gallery/23_AIMS-Compete.jpg",
  },
  {
    text: "We know Omer is a multi-talent guy in AIMS but his greatest talent is getting Majdi lost during one-to-one meetings by diving into a million complex directions to describe his research. Majdi says he needs a meditation retreat afterward.",
    image: "/gallery/24_Omer-Talent.jpg",
  },
  {
    text: "Mohammed, who is conducting research on Sustainable Aviation Fuel (SAF), is applying his research in practice here, with his brain powering this balloon with SAF.",
    image: "/gallery/25_Mohammed-SAF.jpg",
  },
  {
    text: "Patrick complains he does not get much time to chat with Majdi. Meanwhile Patrick when Majdi tries to schedule a meeting …",
    image: "/gallery/26_Patrick-Busy.jpg",
  },
  {
    text: "Our reaction when Majdi says the paper still needs a lot of work just to be “good”.",
    image: "/gallery/27_Paper-feedback.jpg",
  },
  {
    text: "Majdi taking pictures with crocodiles = Our *worst* nightmare of a new project. Please, no hands-on experience needed.",
    image: "/gallery/28_Majdi-with-Crocodiles.jpg",
  },
  {
    text: "We tell Majdi we’re working *super* hard during our internships, and people are basically blown away by our brilliance. A spy then sends him this.",
    image: "/gallery/29_Students-Internships.jpg",
  },
  {
    text: "And we remain friends and professionals! Thank you from the AIMS family!",
    image: "/gallery/31_AndWeRemainFriends.jpg",
  },
  {
    text: "",
    image: "/gallery/32_Qasiddiq.jpeg",
  },
  {
    text: "",
    image: "/gallery/33_Shahyug.jpeg",
  },
  {
    text: "",
    image: "/gallery/34_Miloparr.jpg",
  },
  {
    text: "Shamanth when he sees an unusually large dog behind him",
    image: "/gallery/35_Sshamant.jpeg",
  },
];

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function migrate() {
  console.log('Starting migration...')

  // 1. Migrate News
  console.log('Migrating news...')
  const { error: newsError } = await supabase
    .from('news')
    .upsert(newsItems.map(item => ({
      title: item.title,
      excerpt: item.excerpt,
      content: item.content,
      link: item.link,
      date: item.date,
      timestamp: item.timestamp,
      image_url: item.imageUrl,
      images: item.images || [],
      category: item.category,
      featured: item.featured,
      author: item.author,
      slug: item.slug
    })), { onConflict: 'slug' })
  if (newsError) console.error('Error migrating news:', newsError)

  // 2. Migrate Members
  console.log('Migrating members...')
  const { error: membersError } = await supabase
    .from('members')
    .upsert(teamMembers.map(member => ({
      id: member.id,
      name: member.name,
      email: member.email,
      status: member.status,
      role: member.role,
      joined_date: member.joinedDate,
      image_url: member.imageUrl,
      hero_image_url: member.heroImageUrl,
      bio: member.bio,
      interests: member.interests || [],
      education: member.education || [],
      degrees: member.degrees || [],
      department: member.department,
      linkedin: member.linkedin,
      website: member.website,
      slug: member.slug
    })), { onConflict: 'slug' })
  if (membersError) console.error('Error migrating members:', membersError)

  // 3. Migrate Research
  console.log('Migrating research...')
  const { error: researchError } = await supabase
    .from('research')
    .upsert(researchItems.map(item => ({
      id: item.id,
      type: item.type,
      title: item.title,
      group_name: item.group,
      image_url: item.imageUrl,
      is_recent: item.isRecent,
      authors: item.authors || [],
      journal: item.journal,
      year: item.year,
      timestamp: item.timestamp,
      abstract: item.abstract,
      keywords: item.keywords || [],
      doi: item.doi,
      pdf_url: item.pdfUrl,
      description: item.description,
      status: item.status,
      start_year: item.startYear,
      end_year: item.endYear,
      funding_source: item.fundingSource,
      collaborators: item.collaborators || [],
      website_url: item.websiteUrl
    })), { onConflict: 'id' })
  if (researchError) console.error('Error migrating research:', researchError)

  // 4. Migrate Map Locations & Connections
  console.log('Migrating map data...')
  // map_locations uses a country as a unique key for simplicity in migration
  const locationNameToId: Record<string, string> = {}
  
  for (const connection of mapDataRaw) {
    for (const loc of [connection.start, connection.end]) {
      if (!locationNameToId[loc.country]) {
        const { data, error } = await supabase
          .from('map_locations')
          .upsert({
            lat: loc.lat,
            lng: loc.lng,
            country: loc.country
          }, { onConflict: 'country' })
          .select('id')
          .single()
        
        if (error) console.error(`Error migrating location ${loc.country}:`, error)
        if (data) locationNameToId[loc.country] = data.id
      }
    }
  }

  for (const connection of mapDataRaw) {
    const startId = locationNameToId[connection.start.country]
    const endId = locationNameToId[connection.end.country]
    if (startId && endId) {
      const { error } = await supabase
        .from('map_connections')
        .insert({
          start_location_id: startId,
          end_location_id: endId
        })
      if (error) console.error('Error migrating connection:', error)
    }
  }

  // 5. Migrate Gallery Items
  console.log('Migrating gallery items...')
  
  // Combine homepage and full gallery items, avoiding duplicates by src
  const galleryItemsMap: Record<string, any> = {}
  
  galleryFull.forEach(item => {
    galleryItemsMap[item.image] = {
      src: item.image,
      title: item.text,
      is_homepage: false
    }
  })

  galleryHome.forEach(item => {
    if (galleryItemsMap[item.src]) {
      galleryItemsMap[item.src].is_homepage = true
    } else {
      galleryItemsMap[item.src] = {
        src: item.src,
        title: item.title,
        is_homepage: true
      }
    }
  })

  const { error: galleryError } = await supabase
    .from('gallery_items')
    .upsert(Object.values(galleryItemsMap), { onConflict: 'src' })
  
  if (galleryError) console.error('Error migrating gallery items:', galleryError)

  console.log('Migration finished!')
}

migrate()
