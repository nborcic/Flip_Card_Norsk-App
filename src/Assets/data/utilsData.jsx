export const AvatarUploader = ({ formData, setFormData }) => (
  <div>
    <h1>{formData.avatar ? "" : "Upload Avatar"}</h1>
    {formData.avatar ? (
      <div className="relative auto h-24 justify-center flex ">
        <img
          src={URL.createObjectURL(formData.avatar)}
          alt="Profile"
          className=" rounded-xl object-cover hover:scale-105 transition-all"
        />
        <input type="hidden" name="avatar" value={formData.avatar} />
        <button
          type="button"
          onClick={() => setFormData({ ...formData, avatar: null })}
          className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-2 hover:bg-red-600"
        >
          X
        </button>
      </div>
    ) : (
      <div>
        <input
          type="file"
          name="avatar"
          id="avatar"
          accept="image/*"
          onChange={(e) =>
            setFormData({ ...formData, avatar: e.target.files[0] })
          }
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
        />
      </div>
    )}
  </div>
);

export default AvatarUploader;
