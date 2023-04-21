import RestaurantService from "@/app/api/services/restaurantService";
import BASE_URL from "@/app/constants/baseUrl";
import withErrorHandeler from "@/app/hof/withErrorHandler";
import Image from "next/image";
import React from "react";

const CompleteInfoForum = ({ res, isUpdate }: any) => {
  const [error, setError] = React.useState<any>(null);
  const [selectedImages, setSelectedImages] = React.useState<any>(
    res?.images.map((item: any) => `${BASE_URL}${item.image}`)
  );

  console.log(res.is_allowed)
  // create object state which will be used to store the form data
  const [formData, setFormData] = React.useState<any>({
    allowed: res?.is_allowed,
    gallery: [],
    address: res?.location,
    description: res?.description,
    googleMapLink: res?.googleMapLink,
    maxGuests: 0,
    name: res?.name,
    phone: res.phone,
    profileImage: "",
    workTime: res.working_hours,
  });

  // create a state to store the file
  const days = [
    { day: "B.e", name: "Bazar ertəsi" },
    { day: "Ç.a", name: "Çərşənbə axşamı" },
    { day: "Ç", name: "Çərşənbə" },
    { day: "C.a", name: "Cümə axşamı" },
    { day: "C", name: "Cümə" },
    { day: "Ş", name: "Şənbə" },
    { day: "B", name: "Bazar" }];

  // check if the day is selected in workTime array
  const checkingDaySelected = (day: string) => {
    const daySelected = formData?.workTime?.find(
      (item: any) => item.day === day
    );
    if (daySelected) {
      return true;
    }
    return false;
  };

  // add or remove day from workTime array
  const addDay = (day: string) => {
    const daySelected = formData?.workTime?.find(
      (item: any) => item.day === day
    );
    if (daySelected) {
      const newFormData = { ...formData };
      newFormData.workTime = newFormData.workTime?.filter(
        (item: any) => item.day !== day
      );
      setFormData(newFormData);
    } else {
      const newFormData = { ...formData };
      newFormData.workTime?.push({
        day,
        open_at: newFormData.workTime[0]?.open_at || "09:00",
        close_at: newFormData.workTime[0]?.close_at || "18:00",
      });
      setFormData(newFormData);
    }
  };

  // handle the change of the input in typescript
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const newFormData = { ...formData };
    newFormData[name] = value;
    setFormData(newFormData);
  };

  // file upload handler and update formData
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files) {
      const newFormData = { ...formData };
      const src = URL.createObjectURL(files[0]);
      newFormData.profileImage = files[0];
      newFormData.gallery = [files[0], ...formData.gallery];
      setFormData(newFormData);
      setSelectedImages([src, ...selectedImages]);
    }
  };

  // galery file upload handler and update formData
  const handleGalleryFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files) {
      const newFormData = { ...formData };
      const srcs = Array.from(files).map((item) => URL.createObjectURL(item));
      newFormData.gallery = [newFormData.profileImage, ...files];
      setFormData(newFormData);
      setSelectedImages([selectedImages[0], ...srcs]);
    }
  };

  // handle the submit of the form
  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!formData.name) {
      setError({ name: "Restoranın adı boş ola bilməz" });
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (!formData.phone) {
      setError({ phone: "Restoranın telefon nömrəsi boş ola bilməz" });
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (!formData.description) {
      setError({ description: "Restoranın təsviri boş ola bilməz" });
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (!formData.address) {
      setError({ address: "Restoranın ünvanı boş ola bilməz" });
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (!formData.googleMapLink) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setError({ googleMapLink: "Restoranın google map linki boş ola bilməz" });
      return;
    }
    if (selectedImages.length === 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setError({ profileImage: "Restoranın şəkli boş ola bilməz" });
      return;
    }
    if (formData.workTime.length === 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setError({ workTime: "Restoranın iş saatı boş ola bilməz" });
      return;
    } else {
      setError({});
    }
    // formdata state converting request
    const request = {
      name: formData.name,
      phone: formData.phone,
      description: formData.description,
      is_allowed: formData.allowed,
      location: formData.address,
      googleMapLink: formData.googleMapLink,
      working_hours_data: formData.workTime,
    };

    withErrorHandeler(
      async (req: any) => {
        await RestaurantService.updateRestaurant(req, res.id);
        if(formData.gallery?.length > 0){
          await RestaurantService.deleteImage(res.id);
          formData.gallery?.map(async (item: any) => {
            await RestaurantService.addImage(
              { image: item, restaurant: res.id },
              res.id
            );
          });
        }
      },
      "Restoranın məlumatları yeniləndi",
      "/restaurant/create-map"
    )(request);
  };

  return (
    <div className="d-flex justify-content-center flex-column align-items-center">
      <h5 className="text-center m-4">
        {isUpdate ? "Tənzimləmələr" : "Biznes məlumatlarını tamamlayın"}
      </h5>
      <form className="form" style={{ width: "38%" }}>
        <label className="p-2 ps-0 pt-3">Restoranın adı</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Restoranın adı"
          className="form-control"
        />
        <div className="invalid-feedback d-block">{error?.name}</div>

        <label className="p-2 ps-0 pt-3">Restoranın əlaqə nömrəsi</label>
        <input
          name="phone"
          type="text"
          value={formData.phone}
          onChange={handleChange}
          placeholder="050 123 45 67"
          className="form-control"
        />
        <div className="invalid-feedback d-block">{error?.phone}</div>

        <label className="p-2 ps-0 pt-3">Restoranın təsviri</label>
        <textarea
          value={formData.description}
          onChange={handleChange}
          name="description"
          placeholder="Restoranın təsvir edin..."
          className="form-control"
        />
        <div className="invalid-feedback d-block">{error?.description}</div>

        <label className="p-2 ps-0 pt-3">Restoranın ünvanı </label>
        <input
          type="text"
          value={formData.address}
          onChange={handleChange}
          name="address"
          placeholder="15 Tarlan Aliyar St, Baku 1005"
          className="form-control"
        />
        <div className="invalid-feedback d-block">{error?.address}</div>

        <label className="p-2 ps-0 pt-3">
          Restoranın “Google Xəritə”dəki ünvanının linki{" "}
        </label>
        <input
          type="text"
          value={formData.googleMapLink}
          onChange={handleChange}
          name="googleMapLink"
          placeholder="https://maps.app.goo.gl/YdXkj5hEiBal3Ga"
          className="form-control"
        />
        <div className="invalid-feedback d-block">{error?.googleMapLink}</div>

        <label className="p-2 ps-0 pt-3 d-block">Profil şəkili </label>
        <label
          htmlFor="single_file"
          className="btn w-75 text-nowrap btn-primary form-control "
        >
          Profil şəkili yükləyin{" "}
        </label>
        <input
          onChange={handleFileUpload}
          hidden
          type="file"
          id="single_file"
        />
        <div className="invalid-feedback d-block">{error?.profileImage}</div>

        <label className="p-2 ps-0 pt-3 d-block">Qalereya</label>
        <label
          htmlFor="multipy_image"
          className="btn text-nowrap w-75 btn-primary form-control "
        >
          Digər şəkilləri yükləyin{" "}
        </label>

        <div className="d-flex mt-4 overflow-auto">
          {selectedImages?.map((image: any, index: number) => {
            return (
              <Image
                src={image}
                alt=""
                key={index}
                style={{
                  aspectRatio: "1/1",
                  objectFit: "contain",
                }}
                width={80}
                height={80}
                className="img-fluid me-2"
              />
            );
          })}
        </div>
        <input
          onChange={handleGalleryFileUpload}
          id="multipy_image"
          type="file"
          hidden
          multiple
          className="form-control"
        />

        <label className="p-2 ps-0 pt-3 d-block">İş vaxtı</label>
        <div className="d-flex">
          {days.map((day, index) => {
            return (
              <div
                key={index}
                onClick={() => addDay(day.name)}
                className={`border ${
                  checkingDaySelected(day.name) ? "border-primary" : ""
                } col-2 text-center py-2`}
              >
                {day.day}
              </div>
            );
          })}
        </div>
        <div className="d-flex my-3  align-items-center">
          <input
            value={formData.workTime[0]?.open_at || "09:00"}
            onChange={(e) => {
              const newFormData = { ...formData };
              if (newFormData.workTime[0]) {
                newFormData.workTime[0].open_at = e.target.value;
                setFormData(newFormData);
              } else {
                alert("Zəhmət olmasa ilk öncə iş gününü seçin");
              }
            }}
            type="time"
            placeholder="Açılma saatı"
            className="form-control"
          />
          <span className="mx-2">:</span>
          <input
            min={formData.workTime[0]?.open_at}
            value={formData.workTime[0]?.close_at || "18:00"}
            type="time"
            onChange={(e) => {
              const newFormData = { ...formData };
              if (newFormData.workTime[0]) {
                newFormData.workTime[0].close_at = e.target.value;
                setFormData(newFormData);
              } else {
                alert("Zəhmət olmasa ilk öncə iş gününü seçin");
              }
            }}
            placeholder="Bağlanma saatı"
            className="form-control"
          />
        </div>
        <div className="invalid-feedback d-block">{error?.workTime}</div>

        <label className="p-2 ps-0 pt-3">
          Onlayn rezervasiya etmək mümkünlüyü{" "}
          <input
            checked={formData.allowed}
            onChange={()=>setFormData({...formData,allowed:!formData.allowed})}
            type={"checkbox"}
            name="allowed"
            className="p-2 m-2"
          />
        </label>
        <div className="invalid-feedback d-block">
          {error?.onlineReservationTime}
        </div>
        <div>
          <button onClick={handleSubmit} className="btn w-50 btn-primary my-4">
            {isUpdate ? "Yadda Saxla" : "Tamamla"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CompleteInfoForum;