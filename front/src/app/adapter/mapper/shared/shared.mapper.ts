/* eslint-disable */
export class SharedMapper {
  public static toFormData<T extends any>(props: any): T {
    let formData = new FormData();

    try {
      for (let key in props) {
        if (props[key]) {
          if (Array.isArray(props[key])) {
            props[key].forEach((item: any) => formData.append(key, JSON.stringify(item)));
          } else if (props[key].type) {
            if (props[key].type === 'audio/mpeg' || props[key].type === "image/jpeg"  || props[key].type === "image/png") {
              formData.append(key, props[key]);
            } else {
              formData.append(key, "");
            }
          } else if (typeof props[key] === "object" && props[key] !== null) {
            formData.append(key, JSON.stringify(props[key]));
          } else {
            formData.append(key, props[key]);
          }
        }
      }
    } catch (err) {
      console.error(err);
    }
    return formData as T;
  }
}
