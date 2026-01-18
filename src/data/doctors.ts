export interface Doctor {
  id: number;
  name: string;
  experience: string;
  rating: number;
  image: string;
  specialty: string;
}

export const doctorsBySpecialty: Record<string, Doctor[]> = {
  'general-medicine': [
    { id: 1, name: 'Dr. Rajesh Kumar', experience: '18 years', rating: 4.9, image: '/placeholder.svg', specialty: 'General Medicine' },
    { id: 2, name: 'Dr. Priya Sharma', experience: '14 years', rating: 4.8, image: '/placeholder.svg', specialty: 'General Medicine' },
    { id: 3, name: 'Dr. Amit Patel', experience: '11 years', rating: 4.7, image: '/placeholder.svg', specialty: 'General Medicine' },
    { id: 4, name: 'Dr. Sneha Reddy', experience: '9 years', rating: 4.8, image: '/placeholder.svg', specialty: 'General Medicine' },
    { id: 5, name: 'Dr. Vikram Singh', experience: '16 years', rating: 4.9, image: '/placeholder.svg', specialty: 'General Medicine' },
  ],
  'cardiology': [
    { id: 1, name: 'Dr. Arun Mehta', experience: '20 years', rating: 4.9, image: '/placeholder.svg', specialty: 'Cardiology' },
    { id: 2, name: 'Dr. Kavitha Nair', experience: '15 years', rating: 4.8, image: '/placeholder.svg', specialty: 'Cardiology' },
    { id: 3, name: 'Dr. Suresh Iyer', experience: '12 years', rating: 4.7, image: '/placeholder.svg', specialty: 'Cardiology' },
    { id: 4, name: 'Dr. Meena Krishnamurthy', experience: '18 years', rating: 4.9, image: '/placeholder.svg', specialty: 'Cardiology' },
    { id: 5, name: 'Dr. Rohit Agarwal', experience: '10 years', rating: 4.6, image: '/placeholder.svg', specialty: 'Cardiology' },
  ],
  'dermatology': [
    { id: 1, name: 'Dr. Ananya Gupta', experience: '13 years', rating: 4.9, image: '/placeholder.svg', specialty: 'Dermatology' },
    { id: 2, name: 'Dr. Siddharth Joshi', experience: '10 years', rating: 4.7, image: '/placeholder.svg', specialty: 'Dermatology' },
    { id: 3, name: 'Dr. Ritu Malhotra', experience: '15 years', rating: 4.8, image: '/placeholder.svg', specialty: 'Dermatology' },
    { id: 4, name: 'Dr. Karan Bhatt', experience: '8 years', rating: 4.6, image: '/placeholder.svg', specialty: 'Dermatology' },
    { id: 5, name: 'Dr. Divya Saxena', experience: '11 years', rating: 4.8, image: '/placeholder.svg', specialty: 'Dermatology' },
  ],
  'mental-health': [
    { id: 1, name: 'Dr. Sunita Rao', experience: '17 years', rating: 4.9, image: '/placeholder.svg', specialty: 'Mental Health' },
    { id: 2, name: 'Dr. Arvind Desai', experience: '14 years', rating: 4.8, image: '/placeholder.svg', specialty: 'Mental Health' },
    { id: 3, name: 'Dr. Neha Kapoor', experience: '12 years', rating: 4.7, image: '/placeholder.svg', specialty: 'Mental Health' },
    { id: 4, name: 'Dr. Manoj Tiwari', experience: '10 years', rating: 4.8, image: '/placeholder.svg', specialty: 'Mental Health' },
    { id: 5, name: 'Dr. Pallavi Menon', experience: '9 years', rating: 4.6, image: '/placeholder.svg', specialty: 'Mental Health' },
  ],
  'pediatrics': [
    { id: 1, name: 'Dr. Geeta Verma', experience: '19 years', rating: 4.9, image: '/placeholder.svg', specialty: 'Pediatrics' },
    { id: 2, name: 'Dr. Ramesh Choudhary', experience: '15 years', rating: 4.8, image: '/placeholder.svg', specialty: 'Pediatrics' },
    { id: 3, name: 'Dr. Anita Bansal', experience: '13 years', rating: 4.7, image: '/placeholder.svg', specialty: 'Pediatrics' },
    { id: 4, name: 'Dr. Sanjay Mishra', experience: '11 years', rating: 4.8, image: '/placeholder.svg', specialty: 'Pediatrics' },
    { id: 5, name: 'Dr. Pooja Kulkarni', experience: '8 years', rating: 4.6, image: '/placeholder.svg', specialty: 'Pediatrics' },
  ],
  'orthopedics': [
    { id: 1, name: 'Dr. Vijay Khanna', experience: '22 years', rating: 4.9, image: '/placeholder.svg', specialty: 'Orthopedics' },
    { id: 2, name: 'Dr. Rekha Naidu', experience: '16 years', rating: 4.8, image: '/placeholder.svg', specialty: 'Orthopedics' },
    { id: 3, name: 'Dr. Ashok Pandey', experience: '14 years', rating: 4.7, image: '/placeholder.svg', specialty: 'Orthopedics' },
    { id: 4, name: 'Dr. Shweta Yadav', experience: '10 years', rating: 4.8, image: '/placeholder.svg', specialty: 'Orthopedics' },
    { id: 5, name: 'Dr. Nitin Srivastava', experience: '12 years', rating: 4.6, image: '/placeholder.svg', specialty: 'Orthopedics' },
  ],
  'gynecology': [
    { id: 1, name: 'Dr. Lakshmi Pillai', experience: '21 years', rating: 4.9, image: '/placeholder.svg', specialty: 'Gynecology' },
    { id: 2, name: 'Dr. Anjali Bose', experience: '17 years', rating: 4.8, image: '/placeholder.svg', specialty: 'Gynecology' },
    { id: 3, name: 'Dr. Kamala Rajan', experience: '14 years', rating: 4.7, image: '/placeholder.svg', specialty: 'Gynecology' },
    { id: 4, name: 'Dr. Seema Chatterjee', experience: '11 years', rating: 4.8, image: '/placeholder.svg', specialty: 'Gynecology' },
    { id: 5, name: 'Dr. Vandana Tripathi', experience: '9 years', rating: 4.6, image: '/placeholder.svg', specialty: 'Gynecology' },
  ],
  'neurology': [
    { id: 1, name: 'Dr. Prakash Menon', experience: '23 years', rating: 4.9, image: '/placeholder.svg', specialty: 'Neurology' },
    { id: 2, name: 'Dr. Nandini Ghosh', experience: '18 years', rating: 4.8, image: '/placeholder.svg', specialty: 'Neurology' },
    { id: 3, name: 'Dr. Raghav Sethi', experience: '15 years', rating: 4.7, image: '/placeholder.svg', specialty: 'Neurology' },
    { id: 4, name: 'Dr. Deepa Murthy', experience: '12 years', rating: 4.8, image: '/placeholder.svg', specialty: 'Neurology' },
    { id: 5, name: 'Dr. Tarun Bhardwaj', experience: '10 years', rating: 4.6, image: '/placeholder.svg', specialty: 'Neurology' },
  ],
  'ophthalmology': [
    { id: 1, name: 'Dr. Sunil Mathur', experience: '20 years', rating: 4.9, image: '/placeholder.svg', specialty: 'Ophthalmology' },
    { id: 2, name: 'Dr. Jaya Krishnan', experience: '16 years', rating: 4.8, image: '/placeholder.svg', specialty: 'Ophthalmology' },
    { id: 3, name: 'Dr. Hemant Deshpande', experience: '13 years', rating: 4.7, image: '/placeholder.svg', specialty: 'Ophthalmology' },
    { id: 4, name: 'Dr. Rashmi Awasthi', experience: '10 years', rating: 4.8, image: '/placeholder.svg', specialty: 'Ophthalmology' },
    { id: 5, name: 'Dr. Gaurav Tandon', experience: '8 years', rating: 4.6, image: '/placeholder.svg', specialty: 'Ophthalmology' },
  ],
  'ent': [
    { id: 1, name: 'Dr. Mohan Lal', experience: '19 years', rating: 4.9, image: '/placeholder.svg', specialty: 'ENT' },
    { id: 2, name: 'Dr. Shalini Sen', experience: '15 years', rating: 4.8, image: '/placeholder.svg', specialty: 'ENT' },
    { id: 3, name: 'Dr. Aditya Saxena', experience: '12 years', rating: 4.7, image: '/placeholder.svg', specialty: 'ENT' },
    { id: 4, name: 'Dr. Preeti Arora', experience: '9 years', rating: 4.8, image: '/placeholder.svg', specialty: 'ENT' },
    { id: 5, name: 'Dr. Vishal Rane', experience: '7 years', rating: 4.6, image: '/placeholder.svg', specialty: 'ENT' },
  ],
};

export const getDefaultDoctors = (): Doctor[] => [
  { id: 1, name: 'Dr. Sarah Williams', experience: '15 years', rating: 4.9, image: '/placeholder.svg', specialty: 'General' },
  { id: 2, name: 'Dr. Michael Chen', experience: '12 years', rating: 4.8, image: '/placeholder.svg', specialty: 'General' },
  { id: 3, name: 'Dr. Emily Rodriguez', experience: '10 years', rating: 4.9, image: '/placeholder.svg', specialty: 'General' },
  { id: 4, name: 'Dr. James Park', experience: '8 years', rating: 4.7, image: '/placeholder.svg', specialty: 'General' },
];

export const getDoctorsForSpecialty = (specialty: string | undefined): Doctor[] => {
  if (!specialty) return getDefaultDoctors();
  const normalizedSpecialty = specialty.toLowerCase().replace(/\s+/g, '-');
  return doctorsBySpecialty[normalizedSpecialty] || getDefaultDoctors();
};
