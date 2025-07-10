from PIL import Image
import os
import re
import shutil

# ディレクトリの設定
base_dir = os.path.dirname(__file__)
input_dir = os.path.join(base_dir, "public", "input")
output_dir = os.path.join(base_dir, "public", "images")

# フォルダ作成（なければ）
os.makedirs(input_dir, exist_ok=True)
os.makedirs(output_dir, exist_ok=True)

valid_extensions = [".jpg", ".jpeg", ".png"]
resize_levels = [4, 8, 16, 32, 256]

# --- Step 1: images フォルダを空にする ---
for f in os.listdir(output_dir):
    file_path = os.path.join(output_dir, f)
    if os.path.isfile(file_path):
        os.remove(file_path)
print("✔ images フォルダを空にしました")

# --- Step 2: AnswerX.jpg を連番にリネーム（欠番を詰める） ---
answer_files = sorted(
    [f for f in os.listdir(input_dir) if re.match(r"Answer\d+\.(jpg|jpeg|png)", f)],
    key=lambda x: int(re.search(r"Answer(\d+)", x).group(1)),
)

for new_index, old_filename in enumerate(answer_files, start=1):
    ext = os.path.splitext(old_filename)[1].lower()
    new_filename = f"Answer{new_index}{ext}"
    if old_filename != new_filename:
        os.rename(
            os.path.join(input_dir, old_filename), os.path.join(input_dir, new_filename)
        )
        print(f"✔ Renamed: {old_filename} → {new_filename}")

# --- Step 3: 未処理画像を AnswerX にリネーム ---
current_count = len(
    [f for f in os.listdir(input_dir) if re.match(r"Answer\d+\.(jpg|jpeg|png)", f)]
)
unprocessed_files = sorted(
    [
        f
        for f in os.listdir(input_dir)
        if os.path.splitext(f)[1].lower() in valid_extensions
        and not f.startswith("Answer")
    ]
)
for i, filename in enumerate(unprocessed_files, start=current_count + 1):
    ext = os.path.splitext(filename)[1].lower()
    new_name = f"Answer{i}{ext}"
    os.rename(os.path.join(input_dir, filename), os.path.join(input_dir, new_name))
    print(f"✔ Renamed new image: {filename} → {new_name}")

# --- Step 4: AnswerX すべてにモザイク処理を再実施 ---
answer_files = sorted(
    [f for f in os.listdir(input_dir) if re.match(r"Answer\d+\.(jpg|jpeg|png)", f)],
    key=lambda x: int(re.search(r"Answer(\d+)", x).group(1)),
)

for f in answer_files:
    match = re.match(r"Answer(\d+)", f)
    if not match:
        continue
    index = int(match.group(1))
    img_path = os.path.join(input_dir, f)
    original = Image.open(img_path)
    original_size = original.size

    for level_index, level in enumerate(resize_levels, start=1):
        blurred = original.resize((level, level), resample=Image.BILINEAR)
        restored = blurred.resize(original_size, Image.NEAREST)
        restored_rgb = restored.convert("RGB")

        output_filename = f"{index}-{level_index}.jpg"
        output_path = os.path.join(output_dir, output_filename)
        restored_rgb.save(output_path)
        print(f"✔ Saved: {output_filename}")
