package com.line.lwp.admin;

import java.awt.Graphics;
import java.awt.Image;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.math.BigDecimal;
import java.math.MathContext;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.imageio.ImageIO;

import org.apache.commons.codec.binary.Base64;

public class ImageHelper {
	public static class ImageReduceModel {
		// 缩放宽度
		private int width;

		// 缩放高度
		private int height;

		// 原比例不拉伸
		private boolean auto;

		// 图片格式
		private String format;

		ImageReduceModel() {
			this.setAuto(true);
			this.setFormat("jpg");
		}

		public int getWidth() {
			return width;
		}

		public void setWidth(int width) {
			this.width = width;
		}

		public int getHeight() {
			return height;
		}

		public void setHeight(int height) {
			this.height = height;
		}

		public boolean isAuto() {
			return auto;
		}

		public void setAuto(boolean auto) {
			this.auto = auto;
		}

		public String getFormat() {
			return format;
		}

		public void setFormat(String format) {
			this.format = format;
		}
	}

	/**
	 * @param file 源图片
	 * @param scale 缩放比例，如1.2 
	 * @param format 图片格式 例如jpg 
	 * @return base64 base64字符串
	 */
	/*public static String scaleImage(File file, double scale, String format) {
		String base64 = "";
		BufferedImage bufferedImage;
	
		try {
			bufferedImage = ImageIO.read(file);
			int width = bufferedImage.getWidth();
			int height = bufferedImage.getHeight();
	
			width = parseDoubleToInt(width * scale);
			height = parseDoubleToInt(height * scale);
	
			Image image = bufferedImage.getScaledInstance(width, height,
					Image.SCALE_SMOOTH);
	
			BufferedImage outputImage = new BufferedImage(width, height,
					BufferedImage.TYPE_INT_RGB);
			Graphics graphics = outputImage.getGraphics();
			graphics.drawImage(image, 0, 0, null);
			graphics.dispose();
	
			OutputStream os = new ByteArrayOutputStream();
	
			ImageIO.write(outputImage, format, os);
			base64 = os.toString();
	
			// ImageIO.write(outputImage, format, new File(destinationPath));
		} catch (IOException e) {
			System.out.println("scaleImage方法压缩图片时出错了");
			e.printStackTrace();
		}
	
		return base64;
	}*/

	/**
	 * 将图片缩放到指定的高度或者宽度 
	 * @param file 图片
	 * @param irm 图片缩放格式
	 * @return base64字符串数组
	 */
	public static List<String> scaleImageWithParams(File file,
			ImageReduceModel... irm) {
		List<String> result = null;
		List<ImageReduceModel> irmList = Arrays.asList(irm);

		try {
			BufferedImage bufferedImage = ImageIO.read(file);
			result = getBase64StringList(irmList, bufferedImage);
		} catch (IOException e) {
			e.printStackTrace();
		}

		return result;
	}

	/**
	 * @param base64String
	 * @param irm
	 * @return
	 */
	public static List<String> scaleImageWithParams(String base64String,
			ImageReduceModel... irm) {
		List<String> result = null;
		List<ImageReduceModel> irmList = Arrays.asList(irm);

		byte[] bytes = Base64.decodeBase64(base64String);
		ByteArrayInputStream bais = new ByteArrayInputStream(bytes);

		try {
			BufferedImage bufferedImage = ImageIO.read(bais);
			result = getBase64StringList(irmList, bufferedImage);
		} catch (IOException e) {
			e.printStackTrace();
		}

		return result;
	}

	private static List<String> getBase64StringList(List<ImageReduceModel> irmList,
			BufferedImage bufferedImage) {
		List<String> result = new ArrayList<>();

		try {
			Base64 encoder = new Base64();

			irmList.forEach(dis -> {
				int width = dis.getWidth();
				int height = dis.getHeight();
				String format = dis.getFormat();

				if (dis.isAuto()) {
					ArrayList<Integer> paramsArrayList = getAutoWidthAndHeight(bufferedImage, width, height);
					width = paramsArrayList.get(0);
					height = paramsArrayList.get(1);
				}

				Image image = bufferedImage.getScaledInstance(width, height,
						Image.SCALE_DEFAULT);
				BufferedImage outputImage = new BufferedImage(width, height,
						BufferedImage.TYPE_INT_RGB);
				Graphics graphics = outputImage.getGraphics();
				graphics.drawImage(image, 0, 0, null);
				graphics.dispose();

				/*
				try {
					ImageIO.write(outputImage, format, new File("C:\\Users\\naver\\Desktop\\123.jpg"));
				} catch (IOException x) {
					x.printStackTrace();
				}
				*/

				ByteArrayOutputStream baos = new ByteArrayOutputStream();

				try {
					ImageIO.write(outputImage, format, baos);
				} catch (IOException e) {
					e.printStackTrace();
				}

				byte[] bytes = baos.toByteArray();

				result.add(encoder.encodeAsString(bytes).trim());
			});
		} catch (Exception e) {
			System.out.println("scaleImageWithParams方法压缩图片时出错了");
			e.printStackTrace();
		}

		return result;
	}

	/** 
	 * 将double类型的数据转换为int，四舍五入原则 
	 * 
	 * @param sourceDouble 
	 * @return 
	 */
	private static int parseDoubleToInt(double sourceDouble) {
		int result = 0;
		result = (int) sourceDouble;
		return result;
	}

	/*** 
	 * 
	 * @param bufferedImage 要缩放的图片对象 
	 * @param width_scale 要缩放到的宽度 
	 * @param height_scale 要缩放到的高度 
	 * @return 一个集合，第一个元素为宽度，第二个元素为高度 
	 */
	private static ArrayList<Integer> getAutoWidthAndHeight(BufferedImage bufferedImage, int width_scale,
			int height_scale) {
		ArrayList<Integer> arrayList = new ArrayList<Integer>();
		int width = bufferedImage.getWidth();
		int height = bufferedImage.getHeight();
		double scale_w = getDot2Decimal(width_scale, width);

		double scale_h = getDot2Decimal(height_scale, height);
		if (scale_w < scale_h) {
			arrayList.add(parseDoubleToInt(scale_w * width));
			arrayList.add(parseDoubleToInt(scale_w * height));
		} else {
			arrayList.add(parseDoubleToInt(scale_h * width));
			arrayList.add(parseDoubleToInt(scale_h * height));
		}
		return arrayList;

	}

	/*** 
	 * 返回两个数a/b的小数点后三位的表示 
	 * @param a 
	 * @param b 
	 * @return 
	 */
	private static double getDot2Decimal(int a, int b) {

		BigDecimal bigDecimal_1 = new BigDecimal(a);
		BigDecimal bigDecimal_2 = new BigDecimal(b);
		BigDecimal bigDecimal_result = bigDecimal_1.divide(bigDecimal_2, new MathContext(4));
		Double double1 = new Double(bigDecimal_result.toString());

		return double1;
	}

	public static void main(String[] args) {
		File img = new File("C:\\Users\\naver\\Desktop\\timg.jpg");

		ImageReduceModel irm1 = new ImageReduceModel();
		irm1.setHeight(200);
		irm1.setWidth(200);

		List<String> t = ImageHelper.scaleImageWithParams(img, irm1);
		t.forEach(System.out::println);

		String base64String = "";

		List<String> t2 = ImageHelper.scaleImageWithParams(base64String, irm1);
		t2.forEach(System.out::println);
	}
}
