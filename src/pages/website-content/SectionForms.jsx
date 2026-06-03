import { Form, Input, InputNumber, Button, Divider, Space, Select, Upload, Image, message } from "antd";
import { PlusOutlined, MinusCircleOutlined, UploadOutlined } from "@ant-design/icons";
import axiosInstance from "../../utils/axios";

const { TextArea } = Input;

const ImageUpload = ({ value, onChange }) => {
  const handleUpload = async ({ file, onSuccess, onError }) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const { data } = await axiosInstance.post("/media", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onChange(data.url);
      onSuccess(data);
    } catch (err) {
      message.error("Image upload failed");
      onError(err);
    }
  };

  return (
    <Space direction="vertical">
      <Upload
        accept="image/*"
        showUploadList={false}
        customRequest={handleUpload}
      >
        <Button icon={<UploadOutlined />}>Upload Image</Button>
      </Upload>
      {value && (
        <Image src={value} width={120} style={{ borderRadius: 4, border: "1px solid #f0f0f0" }} />
      )}
      {value && (
        <Input
          size="small"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{ width: 340, fontSize: 12, color: "#888" }}
        />
      )}
    </Space>
  );
};

// ── Reusable ────────────────────────────────────────────────────────────────

const FA_ICONS = [
  "fa-light fa-leaf",
  "fa-light fa-seedling",
  "fa-light fa-tree",
  "fa-light fa-recycle",
  "fa-light fa-cloud",
  "fa-light fa-sun",
  "fa-light fa-wind",
  "fa-light fa-fire-flame-curved",
  "fa-light fa-bolt",
  "fa-light fa-trash-can-slash",
  "fa-light fa-filter",
  "fa-light fa-gears",
  "fa-light fa-gear",
  "fa-light fa-truck-fast",
  "fa-light fa-truck",
  "fa-light fa-shield-check",
  "fa-light fa-badge-check",
  "fa-light fa-certificate",
  "fa-light fa-star",
  "fa-light fa-award",
  "fa-light fa-medal",
  "fa-light fa-trophy",
  "fa-light fa-handshake",
  "fa-light fa-hands-holding",
  "fa-light fa-people-group",
  "fa-light fa-building-columns",
  "fa-light fa-industry",
  "fa-light fa-factory",
  "fa-light fa-location-dot",
  "fa-light fa-phone-volume",
  "fa-light fa-envelope",
  "fa-light fa-headset",
  "fa-light fa-comments",
  "fa-light fa-chart-line",
  "fa-light fa-chart-bar",
  "fa-light fa-chart-pie",
  "fa-light fa-arrow-trend-up",
  "fa-light fa-check-circle",
  "fa-light fa-circle-check",
  "fa-light fa-clock",
  "fa-light fa-calendar",
  "fa-light fa-map",
  "fa-light fa-globe",
  "fa-light fa-users",
  "fa-light fa-user-tie",
  "fa-light fa-briefcase",
  "fa-light fa-lightbulb",
  "fa-light fa-wrench",
  "fa-light fa-hammer",
  "fa-light fa-hard-hat",
  "fa-light fa-helmet-safety",
  "fa-light fa-flask",
  "fa-light fa-microscope",
  "fa-light fa-dumpster",
  "fa-light fa-box",
  "fa-light fa-boxes-stacked",
  "fa-light fa-weight-scale",
  "fa-light fa-droplet",
  "fa-light fa-water",
  "fa-light fa-mountain",
  "fa-light fa-spa",
];

const IconInput = ({ value, onChange }) => (
  <Space>
    <Select
      showSearch
      allowClear
      value={value || undefined}
      placeholder="Choose an icon"
      style={{ width: 300 }}
      onChange={onChange}
      optionFilterProp="search"
      options={FA_ICONS.map((cls) => ({
        value: cls,
        search: cls,
        label: (
          <Space>
            <i className={cls} style={{ width: 16, textAlign: "center" }} />
            <span style={{ fontSize: 12 }}>{cls.replace("fa-light ", "")}</span>
          </Space>
        ),
      }))}
    />
    {value && <i className={value} style={{ fontSize: 20, color: "#1677ff" }} />}
  </Space>
);

const SubtitleTitleFields = () => (
  <>
    <Form.Item label="Subtitle" name={["content", "subtitle"]}>
      <Input />
    </Form.Item>
    <Form.Item label="Title" name={["content", "title"]} rules={[{ required: true }]}>
      <Input />
    </Form.Item>
  </>
);

const CardListField = ({ name, label = "Cards" }) => (
  <Form.List name={["content", name]}>
    {(fields, { add, remove }) => (
      <>
        <Divider orientation="left">{label}</Divider>
        {fields.map(({ key, name: n, ...rest }) => (
          <Space key={key} align="start" style={{ display: "flex", marginBottom: 8 }}>
            <div style={{ flex: 1 }}>
              <Form.Item {...rest} name={[n, "icon"]} label="Icon class">
                <IconInput />
              </Form.Item>
              <Form.Item {...rest} name={[n, "title"]} label="Title" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item {...rest} name={[n, "description"]} label="Description">
                <TextArea rows={2} />
              </Form.Item>
            </div>
            <MinusCircleOutlined onClick={() => remove(n)} style={{ marginTop: 36, color: "#ff4d4f" }} />
          </Space>
        ))}
        <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />} block>
          Add {label.replace(/s$/, "")}
        </Button>
      </>
    )}
  </Form.List>
);

// ── Section forms ────────────────────────────────────────────────────────────

export const PhilosophyForm = () => (
  <>
    <Form.Item label="Subtitle" name={["content", "subtitle"]}>
      <Input />
    </Form.Item>
    <Form.Item label="Quote" name={["content", "quote"]} rules={[{ required: true }]}>
      <TextArea rows={3} />
    </Form.Item>
    <Form.Item label="Tagline" name={["content", "tagline"]}>
      <Input />
    </Form.Item>
  </>
);

export const AboutForm = () => (
  <>
    <SubtitleTitleFields />
    <Form.Item label="Heading" name={["content", "heading"]}>
      <Input />
    </Form.Item>
    <Form.Item label="Image" name={["content", "image"]}>
      <ImageUpload />
    </Form.Item>

    <Divider orientation="left">Paragraphs</Divider>
    <Form.List name={["content", "paragraphs"]}>
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...rest }) => (
            <Space key={key} align="start" style={{ display: "flex", marginBottom: 8 }}>
              <Form.Item {...rest} name={name} style={{ flex: 1, width: "100%" }}>
                <TextArea rows={3} style={{ width: 480 }} />
              </Form.Item>
              <MinusCircleOutlined onClick={() => remove(name)} style={{ marginTop: 8, color: "#ff4d4f" }} />
            </Space>
          ))}
          <Button type="dashed" onClick={() => add("")} icon={<PlusOutlined />} block>
            Add Paragraph
          </Button>
        </>
      )}
    </Form.List>

    <Divider orientation="left">Achievements</Divider>
    <Form.List name={["content", "achievements"]}>
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...rest }) => (
            <Space key={key} align="start" style={{ display: "flex", marginBottom: 8 }}>
              <div>
                <Form.Item {...rest} name={[name, "icon"]} label="Icon">
                  <IconInput />
                </Form.Item>
                <Space>
                  <Form.Item {...rest} name={[name, "value"]} label="Value">
                    <Input style={{ width: 100 }} />
                  </Form.Item>
                  <Form.Item {...rest} name={[name, "label"]} label="Label">
                    <Input style={{ width: 240 }} />
                  </Form.Item>
                </Space>
              </div>
              <MinusCircleOutlined onClick={() => remove(name)} style={{ marginTop: 36, color: "#ff4d4f" }} />
            </Space>
          ))}
          <Button type="dashed" onClick={() => add({})} icon={<PlusOutlined />} block>
            Add Achievement
          </Button>
        </>
      )}
    </Form.List>
  </>
);

export const MissionForm = () => (
  <>
    <SubtitleTitleFields />
    <Form.Item label="Description" name={["content", "description"]}>
      <TextArea rows={4} />
    </Form.Item>
    <CardListField name="cards" label="Mission Cards" />
  </>
);

export const QuickServicesForm = () => (
  <Form.List name="content">
    {(fields, { add, remove }) => (
      <>
        <Divider orientation="left">Quick Service Cards</Divider>
        {fields.map(({ key, name, ...rest }) => (
          <Space key={key} align="start" style={{ display: "flex", marginBottom: 8 }}>
            <div>
              <Form.Item {...rest} name={[name, "icon"]} label="Icon">
                <IconInput />
              </Form.Item>
              <Form.Item {...rest} name={[name, "title"]} label="Title" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item {...rest} name={[name, "description"]} label="Description">
                <TextArea rows={2} />
              </Form.Item>
            </div>
            <MinusCircleOutlined onClick={() => remove(name)} style={{ marginTop: 36, color: "#ff4d4f" }} />
          </Space>
        ))}
        <Button type="dashed" onClick={() => add({})} icon={<PlusOutlined />} block>
          Add Service Card
        </Button>
      </>
    )}
  </Form.List>
);

export const ServicesForm = () => (
  <>
    <SubtitleTitleFields />
    <Divider orientation="left">Service Details</Divider>
    <Form.List name={["content", "details"]}>
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...rest }) => (
            <div key={key} style={{ border: "1px solid #f0f0f0", borderRadius: 8, padding: 16, marginBottom: 12 }}>
              <Space style={{ justifyContent: "space-between", width: "100%" }}>
                <strong>Service #{name + 1}</strong>
                <MinusCircleOutlined onClick={() => remove(name)} style={{ color: "#ff4d4f" }} />
              </Space>
              <Form.Item {...rest} name={[name, "icon"]} label="Icon">
                <IconInput />
              </Form.Item>
              <Form.Item {...rest} name={[name, "title"]} label="Title" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Divider orientation="left" plain>Bullet Points</Divider>
              <Form.List name={[name, "items"]}>
                {(itemFields, { add: addItem, remove: removeItem }) => (
                  <>
                    {itemFields.map(({ key: ik, name: iname, ...irest }) => (
                      <Space key={ik} align="start" style={{ display: "flex", marginBottom: 6 }}>
                        <Form.Item {...irest} name={iname} style={{ flex: 1 }}>
                          <Input style={{ width: 420 }} />
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => removeItem(iname)} style={{ marginTop: 8, color: "#ff4d4f" }} />
                      </Space>
                    ))}
                    <Button size="small" type="dashed" onClick={() => addItem("")} icon={<PlusOutlined />}>
                      Add Point
                    </Button>
                  </>
                )}
              </Form.List>
            </div>
          ))}
          <Button type="dashed" onClick={() => add({})} icon={<PlusOutlined />} block>
            Add Service
          </Button>
        </>
      )}
    </Form.List>
  </>
);

export const EnvironmentalBenefitsForm = () => (
  <>
    <SubtitleTitleFields />
    <CardListField name="cards" label="Benefit Cards" />
    <Divider />
    <Form.Item label="Banner Text" name={["content", "banner"]}>
      <Input />
    </Form.Item>
  </>
);

export const WasteToEnergyForm = () => (
  <>
    <SubtitleTitleFields />
    <Divider orientation="left">Items</Divider>
    <Form.List name={["content", "items"]}>
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...rest }) => (
            <div key={key} style={{ border: "1px solid #f0f0f0", borderRadius: 8, padding: 16, marginBottom: 12 }}>
              <Space style={{ justifyContent: "space-between", width: "100%" }}>
                <strong>Item #{name + 1}</strong>
                <MinusCircleOutlined onClick={() => remove(name)} style={{ color: "#ff4d4f" }} />
              </Space>
              <Space>
                <Form.Item {...rest} name={[name, "number"]} label="Number">
                  <Input style={{ width: 60 }} placeholder="01" />
                </Form.Item>
                <Form.Item {...rest} name={[name, "category"]} label="Category">
                  <Input style={{ width: 200 }} />
                </Form.Item>
              </Space>
              <Form.Item {...rest} name={[name, "title"]} label="Title" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item {...rest} name={[name, "image"]} label="Image">
                <ImageUpload />
              </Form.Item>
              <Form.Item {...rest} name={[name, "description"]} label="Description">
                <TextArea rows={3} />
              </Form.Item>
              <Space>
                <Form.Item {...rest} name={[name, "buttonText"]} label="Button Text">
                  <Input style={{ width: 150 }} />
                </Form.Item>
                <Form.Item {...rest} name={[name, "buttonLink"]} label="Button Link">
                  <Input style={{ width: 200 }} />
                </Form.Item>
              </Space>
            </div>
          ))}
          <Button type="dashed" onClick={() => add({})} icon={<PlusOutlined />} block>
            Add Item
          </Button>
        </>
      )}
    </Form.List>
  </>
);

export const WhyChooseForm = () => (
  <>
    <Form.Item label="Title" name={["content", "title"]} rules={[{ required: true }]}>
      <Input />
    </Form.Item>

    <Divider orientation="left">Reasons</Divider>
    <Form.List name={["content", "reasons"]}>
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...rest }) => (
            <Space key={key} align="start" style={{ display: "flex", marginBottom: 8 }}>
              <div>
                <Form.Item {...rest} name={[name, "icon"]} label="Icon">
                  <IconInput />
                </Form.Item>
                <Form.Item {...rest} name={[name, "title"]} label="Title" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
                <Form.Item {...rest} name={[name, "description"]} label="Description">
                  <TextArea rows={2} />
                </Form.Item>
              </div>
              <MinusCircleOutlined onClick={() => remove(name)} style={{ marginTop: 36, color: "#ff4d4f" }} />
            </Space>
          ))}
          <Button type="dashed" onClick={() => add({})} icon={<PlusOutlined />} block>
            Add Reason
          </Button>
        </>
      )}
    </Form.List>

    <Divider orientation="left">Progress Bars</Divider>
    <Form.List name={["content", "progressBars"]}>
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...rest }) => (
            <Space key={key} align="start" style={{ display: "flex", marginBottom: 8 }}>
              <Form.Item {...rest} name={[name, "label"]} label="Label">
                <Input style={{ width: 280 }} />
              </Form.Item>
              <Form.Item {...rest} name={[name, "value"]} label="Value (%)">
                <InputNumber min={0} max={100} style={{ width: 80 }} />
              </Form.Item>
              <MinusCircleOutlined onClick={() => remove(name)} style={{ marginTop: 36, color: "#ff4d4f" }} />
            </Space>
          ))}
          <Button type="dashed" onClick={() => add({})} icon={<PlusOutlined />} block>
            Add Progress Bar
          </Button>
        </>
      )}
    </Form.List>
  </>
);

export const FaqsForm = () => (
  <Form.List name="content">
    {(fields, { add, remove }) => (
      <>
        <Divider orientation="left">FAQ Items</Divider>
        {fields.map(({ key, name, ...rest }) => (
          <div key={key} style={{ border: "1px solid #f0f0f0", borderRadius: 8, padding: 16, marginBottom: 12 }}>
            <Space style={{ justifyContent: "space-between", width: "100%" }}>
              <strong>FAQ #{name + 1}</strong>
              <MinusCircleOutlined onClick={() => remove(name)} style={{ color: "#ff4d4f" }} />
            </Space>
            <Form.Item {...rest} name={[name, "question"]} label="Question" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item {...rest} name={[name, "answer"]} label="Answer" rules={[{ required: true }]}>
              <TextArea rows={3} />
            </Form.Item>
          </div>
        ))}
        <Button type="dashed" onClick={() => add({})} icon={<PlusOutlined />} block>
          Add FAQ
        </Button>
      </>
    )}
  </Form.List>
);

export const SECTION_FORM_MAP = {
  philosophy: PhilosophyForm,
  about: AboutForm,
  mission: MissionForm,
  quickServices: QuickServicesForm,
  services: ServicesForm,
  environmentalBenefits: EnvironmentalBenefitsForm,
  wasteToEnergy: WasteToEnergyForm,
  whyChoose: WhyChooseForm,
  faqs: FaqsForm,
};
