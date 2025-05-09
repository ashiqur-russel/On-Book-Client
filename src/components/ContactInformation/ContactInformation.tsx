
const ContactInformation = () => {
    return (
        <div className="bg-gray-100 py-12">
            <div className="container mx-auto text-center">
                <h2 className="text-2xl font-semibold text-gray-800 mb-8">Do you have questions?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
                    {/* General Inquiries */}
                    <div className="bg-white rounded-md shadow-md p-6">
                        <h3 className="text-lg font-medium text-gray-700 mb-2">General inquiries</h3>
                        <p className="text-xl font-semibold text-gray-900">+49 (0) 123 / 4 05 06 07</p>
                    </div>

                    {/* eBook & eReader Support */}
                    <div className="bg-white rounded-md shadow-md p-6">
                        <h3 className="text-lg font-medium text-gray-700 mb-2">
                            eBook & eReader: Mon-Fri 9am-6pm, Sat 9:30am-6pm
                        </h3>
                        <p className="text-xl font-semibold text-gray-900">+49 (0) 123 / 4 05 06 07</p>
                    </div>

                    {/* Contact by Email */}
                    <div className="bg-white rounded-md shadow-md p-6">
                        <h3 className="text-lg font-medium text-gray-700 mb-2">Contact by email</h3>
                        <p className="text-xl font-semibold text-gray-900">info@bookon.de</p>
                    </div>
                </div>
                <p className="text-sm text-gray-500 mt-6">We are here for you 24 hours a day.</p>
            </div>
        </div>
    );
};

export default ContactInformation;