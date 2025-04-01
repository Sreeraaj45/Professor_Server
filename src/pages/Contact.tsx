import { Mail, MapPin } from 'lucide-react';
import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

interface ContactInfo {
  type: string;
  value: string;
}

export default function Contact() {
  const [messageSent, setMessageSent] = useState(false);
  
  const [contacts, setContacts] = useState<ContactInfo[]>([
    { type: 'email', value: 'sunilck@iiitdwd.ac.in' },
    { type: 'email', value: 'sunilchinnahalli@gmail.com' },
    { type: 'location', value: 'Hubli, Karnataka, India' }
  ]);
  
  const [editingContactIndex, setEditingContactIndex] = useState<number | null>(null);
  const [tempContact, setTempContact] = useState<ContactInfo | null>(null);

  const form = useRef<HTMLFormElement | null>(null);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.current) {
      emailjs.sendForm('service_name', 'template_name', form.current, {
        publicKey: 'emailjs_public_key',
      }).then(
        () => {
          setMessageSent(true);
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
          setMessageSent(false);
        }
      );

      form.current.reset();
    }
  };

  const handleAddContact = () => {
    setContacts([...contacts, { type: 'email', value: '' }]);
    setEditingContactIndex(contacts.length);
    setTempContact({ type: 'email', value: '' });
  };

  const handleEditContact = (index: number) => {
    setEditingContactIndex(index);
    setTempContact({ ...contacts[index] });
  };

  const handleSaveContact = (index: number) => {
    if (tempContact) {
      const updatedContacts = [...contacts];
      updatedContacts[index] = tempContact;
      setContacts(updatedContacts);
    }
    setEditingContactIndex(null);
    setTempContact(null);
  };

  const handleDeleteContact = (index: number) => {
    setContacts(contacts.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen p-6 py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center text-gray-800">Get in Touch</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div>
            <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-200">
              <h3 className="text-xl font-semibold mb-6 text-gray-900">Contact Information</h3>
              <div className="space-y-4">
                {contacts.map((contact, index) => (
                  <div key={index} className="flex items-center text-gray-700">
                    {editingContactIndex === index ? (
                      <>
                        <select
                          value={tempContact?.type}
                          onChange={(e) => setTempContact((prev) => prev ? { ...prev, type: e.target.value } : null)}
                          className="border px-2 py-1 rounded-md mr-2"
                        >
                          <option value="email">Email</option>
                          <option value="location">Location</option>
                        </select>
                        <input
                          type="text"
                          value={tempContact?.value}
                          onChange={(e) => setTempContact((prev) => prev ? { ...prev, value: e.target.value } : null)}
                          className="border px-2 py-1 rounded-md"
                        />
                        <button onClick={() => handleSaveContact(index)} className="ml-2 px-3 py-1 bg-green-600 text-white rounded-lg">Done</button>
                      </>
                    ) : (
                      <>
                        {contact.type === 'email' ? <Mail className="w-5 h-5 text-blue-600 mr-3" /> : <MapPin className="w-5 h-5 text-blue-600 mr-3" />}
                        <span>{contact.value}</span>
                        <button onClick={() => handleEditContact(index)} className="ml-2 text-blue-600">Edit</button>
                        <button onClick={() => handleDeleteContact(index)} className="ml-2 text-red-600">Delete</button>
                      </>
                    )}
                  </div>
                ))}
              </div>
              <button onClick={handleAddContact} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg">Add Contact</button>
            </div>
          </div>

          {/* Contact Form */}
          <form ref={form} onSubmit={sendEmail} className="bg-white p-8 rounded-xl shadow-md border border-gray-200 space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input type="text" id="name" name="from_name" className="w-full px-4 py-2 border border-gray-300 rounded-lg" required />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input type="email" id="email" name="email_id" className="w-full px-4 py-2 border border-gray-300 rounded-lg" required />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea id="message" name="message" className="w-full px-4 py-2 border border-gray-300 rounded-lg" rows={4} required></textarea>
            </div>

            {messageSent && <div className="mt-4 text-center text-green-600 font-semibold">Your message has been sent successfully!</div>}

            <button type="submit" className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
}
